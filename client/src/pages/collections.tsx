import { useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Collection } from "@shared/schema";

const Collections = () => {
  // Update page title
  useEffect(() => {
    document.title = "Collections - Elegante";
  }, []);

  const { data: collections, isLoading, error } = useQuery<Collection[]>({
    queryKey: ['/api/collections'],
  });

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.h1 
        className="text-4xl font-serif text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Collections
      </motion.h1>
      <motion.p 
        className="text-center text-gray-600 mb-12 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Explore our curated collections that celebrate the fusion of traditional craftsmanship and contemporary design.
      </motion.p>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 w-full h-96 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">Failed to load collections. Please try again later.</p>
        </div>
      ) : collections && collections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {collections.map((collection, index) => (
            <motion.div 
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 items-center`}
            >
              <div className="w-full md:w-2/3 relative overflow-hidden group">
                <img 
                  src={collection.imageUrl} 
                  alt={collection.name} 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href={`/products?collection=${collection.slug}`} className="bg-white/90 text-gray-800 px-6 py-2 uppercase tracking-wider text-sm hover:bg-primary hover:text-white transition-colors duration-300">
                    View Collection
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <h2 className="text-2xl font-serif mb-2">{collection.name}</h2>
                <p className="text-gray-600 mb-4">{collection.description}</p>
                <Link 
                  href={`/products?collection=${collection.slug}`}
                  className="text-primary hover:text-gray-800 transition-colors duration-200 flex items-center"
                >
                  Explore Collection <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p>No collections found.</p>
        </div>
      )}

      {/* Seasonal Collections */}
      <div className="mt-24">
        <h2 className="text-3xl font-serif text-center mb-12">Seasonal Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative group overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1592669241067-2f95a559ec1f?q=80&w=1974&auto=format&fit=crop" 
              alt="Summer Collection" 
              className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              <h3 className="text-2xl font-serif mb-2">Summer 2024</h3>
              <p className="mb-4">Light fabrics and vibrant colors for warm days</p>
              <Link 
                href="/products?collection=summer-2024" 
                className="bg-white/80 text-gray-800 px-4 py-2 text-sm uppercase tracking-wider hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Shop Collection
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative group overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop" 
              alt="Festive Collection" 
              className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              <h3 className="text-2xl font-serif mb-2">Festive 2024</h3>
              <p className="mb-4">Celebrate special occasions with timeless elegance</p>
              <Link 
                href="/products?collection=festive-2024" 
                className="bg-white/80 text-gray-800 px-4 py-2 text-sm uppercase tracking-wider hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Shop Collection
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1591792111939-8e641bf814ce?q=80&w=1957&auto=format&fit=crop" 
              alt="Bridal Collection" 
              className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
              <h3 className="text-2xl font-serif mb-2">Bridal 2024</h3>
              <p className="mb-4">Exquisite craftsmanship for your special day</p>
              <Link 
                href="/products?collection=bridal-2024" 
                className="bg-white/80 text-gray-800 px-4 py-2 text-sm uppercase tracking-wider hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Shop Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
