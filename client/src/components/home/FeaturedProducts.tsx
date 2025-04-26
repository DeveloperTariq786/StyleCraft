import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ProductCard from "@/components/shop/ProductCard";
import { Product } from "@shared/schema";

const FeaturedProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products?bestseller=true'],
  });

  const totalItems = products?.length || 0;
  const itemsPerView = totalItems > 0 ? Math.min(totalItems, 4) : 4;
  const totalSlides = Math.max(0, totalItems - itemsPerView + 1);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = (carouselRef.current.scrollWidth / totalItems) * currentIndex;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, totalItems]);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl text-center mb-4"
        >
          Bestsellers
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Our most coveted pieces, loved for their craftsmanship and timeless appeal.
        </motion.p>
        
        <div className="relative">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 w-full h-80 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              Failed to load products. Please try again later.
            </div>
          ) : (
            <>
              <div 
                ref={carouselRef} 
                className="overflow-hidden"
              >
                <div 
                  className="flex transition-transform duration-500 gap-6"
                  style={{ 
                    width: `${(products?.length || 0) * 100}%`, 
                    transform: `translateX(-${(currentIndex / (products?.length || 1)) * 100}%)` 
                  }}
                >
                  {products?.map((product) => (
                    <div 
                      key={product.id} 
                      className="flex-shrink-0" 
                      style={{ width: `calc(100% / ${itemsPerView})` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Controls */}
              <button 
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-800 hover:bg-primary hover:text-white transition duration-300 shadow-md z-10 ${
                  currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous products"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-800 hover:bg-primary hover:text-white transition duration-300 shadow-md z-10 ${
                  currentIndex >= totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                onClick={handleNext}
                disabled={currentIndex >= totalSlides - 1}
                aria-label="Next products"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
