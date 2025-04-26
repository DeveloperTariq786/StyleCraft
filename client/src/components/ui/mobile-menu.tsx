import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useUI } from "@/providers/UIProvider";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = () => {
  const [location] = useLocation();
  const { isMobileMenuOpen, closeMobileMenu } = useUI();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menu when location changes
  useEffect(() => {
    closeMobileMenu();
  }, [location, closeMobileMenu]);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={closeMobileMenu}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <Link href="/" className="font-serif text-2xl font-medium tracking-wider text-gray-800">
                ELEGANTE
              </Link>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <nav className="p-6">
              <ul className="space-y-6">
                <li>
                  <Link 
                    href="/products" 
                    className={`text-lg ${location === '/products' ? 'text-primary' : 'text-gray-800'}`}
                  >
                    New In
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/products?category=women" 
                    className={`text-lg ${location.includes('category=women') ? 'text-primary' : 'text-gray-800'}`}
                  >
                    Women
                  </Link>
                  <ul className="ml-4 mt-2 space-y-2">
                    <li>
                      <Link 
                        href="/products?category=women&type=dresses" 
                        className="text-gray-600 hover:text-primary"
                      >
                        Dresses
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/products?category=women&type=tops" 
                        className="text-gray-600 hover:text-primary"
                      >
                        Tops
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/products?category=women&type=bottoms" 
                        className="text-gray-600 hover:text-primary"
                      >
                        Bottoms
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/products?category=women&type=ethnic" 
                        className="text-gray-600 hover:text-primary"
                      >
                        Ethnic Wear
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link 
                    href="/products?category=men" 
                    className={`text-lg ${location.includes('category=men') ? 'text-primary' : 'text-gray-800'}`}
                  >
                    Men
                  </Link>
                  <ul className="ml-4 mt-2 space-y-2">
                    <li>
                      <Link 
                        href="/products?category=men&type=shirts" 
                        className="text-gray-600 hover:text-primary"
                      >
                        Shirts
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/products?category=men&type=bottoms" 
                        className="text-gray-600 hover:text-primary"
                      >
                        Bottoms
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/products?category=men&type=ethnic" 
                        className="text-gray-600 hover:text-primary"
                      >
                        Ethnic Wear
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link 
                    href="/collections" 
                    className={`text-lg ${location === '/collections' ? 'text-primary' : 'text-gray-800'}`}
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className={`text-lg ${location === '/about' ? 'text-primary' : 'text-gray-800'}`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className={`text-lg ${location === '/contact' ? 'text-primary' : 'text-gray-800'}`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/account" 
                  className="flex items-center space-x-2 text-gray-800 hover:text-primary"
                >
                  <i className="far fa-user"></i>
                  <span>My Account</span>
                </Link>
                <Link 
                  href="/wishlist" 
                  className="flex items-center space-x-2 text-gray-800 hover:text-primary"
                >
                  <i className="far fa-heart"></i>
                  <span>Wishlist</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
