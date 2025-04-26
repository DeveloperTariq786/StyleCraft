import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { useUI } from "@/providers/UIProvider";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@shared/schema";

const SearchOverlay = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [, navigate] = useLocation();
  const { isSearchOpen, closeSearchOverlay } = useUI();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { data: searchResults, isLoading } = useQuery<Product[]>({
    queryKey: searchTerm ? ['/api/products/search', searchTerm] : ['/api/products/search', ''],
    enabled: isSearchOpen && searchTerm.length > 2,
  });

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSearchOverlay();
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isSearchOpen, closeSearchOverlay]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      closeSearchOverlay();
    }
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-start justify-center pt-20 px-4"
          onClick={closeSearchOverlay}
        >
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            className="w-full max-w-2xl bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="relative">
              <Input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
                className="w-full py-4 px-6 text-lg border-0 focus:ring-0 focus:outline-none"
              />
              <button 
                type="submit" 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                <i className="fas fa-search text-lg"></i>
              </button>
            </form>
            
            {searchTerm.length > 2 && (
              <div className="max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center">
                    <p>Searching...</p>
                  </div>
                ) : searchResults && searchResults.length > 0 ? (
                  <div className="p-4 divide-y divide-gray-200">
                    {searchResults.map((product) => (
                      <Link 
                        key={product.id} 
                        href={`/product/${product.id}`}
                        className="flex items-center py-3 hover:bg-gray-50 transition-colors p-2 rounded"
                        onClick={closeSearchOverlay}
                      >
                        <div className="w-16 h-16 flex-shrink-0">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-gray-500 text-sm">{product.description}</p>
                          <p className="text-primary font-medium">₹{product.price.toLocaleString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : searchTerm.length > 2 ? (
                  <div className="p-4 text-center">
                    <p>No products found for "{searchTerm}"</p>
                  </div>
                ) : null}
              </div>
            )}
            
            <div className="p-4 bg-gray-50 border-t">
              <p className="text-xs text-gray-500 text-center">Press ESC to close or click outside</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
