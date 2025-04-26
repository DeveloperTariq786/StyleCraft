import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useUI } from "@/providers/UIProvider";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { openMobileMenu, openSearchOverlay, openCart, isMobile } = useUI();
  const { cartItems } = useCart();
  const [location] = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="relative z-10">
      {/* Top Banner */}
      <div className="bg-gray-900 text-white text-xs text-center py-2 px-4">
        <p>FREE SHIPPING ON ORDERS OVER ₹5000 | SHOP NOW</p>
      </div>
      
      {/* Main Navigation */}
      <nav className={`bg-white border-b border-gray-200 transition-all ${scrolled ? 'sticky top-0 shadow-md' : ''}`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-4">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-800" 
              onClick={openMobileMenu}
              aria-label="Open mobile menu"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
            
            {/* Logo */}
            <div className="flex-1 md:flex-none text-center md:text-left">
              <Link href="/" className="font-serif text-2xl md:text-3xl font-medium tracking-wider text-gray-800">
                ELEGANTE
              </Link>
            </div>
            
            {/* Desktop Navigation Links */}
            {!isMobile && (
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/products" className={`hover:text-primary transition-colors duration-200 uppercase text-sm tracking-wide ${location === '/products' ? 'text-primary' : 'text-gray-800'}`}>
                  New In
                </Link>
                <Link href="/products?category=women" className={`hover:text-primary transition-colors duration-200 uppercase text-sm tracking-wide ${location.includes('category=women') ? 'text-primary' : 'text-gray-800'}`}>
                  Women
                </Link>
                <Link href="/products?category=men" className={`hover:text-primary transition-colors duration-200 uppercase text-sm tracking-wide ${location.includes('category=men') ? 'text-primary' : 'text-gray-800'}`}>
                  Men
                </Link>
                <Link href="/collections" className={`hover:text-primary transition-colors duration-200 uppercase text-sm tracking-wide ${location === '/collections' ? 'text-primary' : 'text-gray-800'}`}>
                  Collections
                </Link>
                <Link href="/about" className={`hover:text-primary transition-colors duration-200 uppercase text-sm tracking-wide ${location === '/about' ? 'text-primary' : 'text-gray-800'}`}>
                  About
                </Link>
              </div>
            )}
            
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button 
                className="text-gray-800 hover:text-primary transition-colors duration-200" 
                onClick={openSearchOverlay}
                aria-label="Search"
              >
                <i className="fas fa-search"></i>
              </button>
              <Link href="/account" className="text-gray-800 hover:text-primary transition-colors duration-200">
                <i className="far fa-user"></i>
              </Link>
              <button 
                className="text-gray-800 hover:text-primary transition-colors duration-200 relative"
                onClick={openCart}
                aria-label="Cart"
              >
                <i className="fas fa-shopping-bag"></i>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
