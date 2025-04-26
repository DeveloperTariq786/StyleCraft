import { createContext, useContext, useState, useEffect } from "react";

// Define the context type
type UIContextType = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  
  isSearchOpen: boolean;
  openSearchOverlay: () => void;
  closeSearchOverlay: () => void;
  
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  
  isMobile: boolean;
};

// Create context with a default value that matches the type
const UIContext = createContext<UIContextType>({
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  
  isSearchOpen: false,
  openSearchOverlay: () => {},
  closeSearchOverlay: () => {},
  
  isMobileMenuOpen: false,
  openMobileMenu: () => {},
  closeMobileMenu: () => {},
  
  isMobile: false
});

// Create the provider component
export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Use effect to detect mobile on client side only
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openCart = () => {
    closeMobileMenu();
    closeSearchOverlay();
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openSearchOverlay = () => {
    closeMobileMenu();
    closeCart();
    setIsSearchOpen(true);
  };

  const closeSearchOverlay = () => {
    setIsSearchOpen(false);
  };

  const openMobileMenu = () => {
    closeCart();
    closeSearchOverlay();
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Create the context value object
  const value: UIContextType = {
    isCartOpen,
    openCart,
    closeCart,
    isSearchOpen,
    openSearchOverlay,
    closeSearchOverlay,
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    isMobile
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

// Custom hook to use the UI context
export const useUI = () => {
  const context = useContext(UIContext);
  return context;
};
