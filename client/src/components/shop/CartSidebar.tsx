import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/CartProvider";
import { useUI } from "@/providers/UIProvider";
import { motion, AnimatePresence } from "framer-motion";

const CartSidebar = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, cartTotal } = useCart();
  const { isCartOpen, closeCart } = useUI();
  const [, navigate] = useLocation();

  // Close cart when pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isCartOpen, closeCart]);

  // Prevent scroll on body when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const decreaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateCartItemQuantity(id, item.quantity - 1);
    }
  };

  const increaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateCartItemQuantity(id, item.quantity + 1);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeCart}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-medium text-lg">Your Shopping Bag ({cartItems.length})</h3>
                  <button className="text-gray-500 hover:text-gray-800" onClick={closeCart}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                
                <div className="flex-grow overflow-auto p-4">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <i className="fas fa-shopping-bag text-4xl text-gray-300 mb-4"></i>
                      <p className="text-gray-500 mb-4">Your shopping bag is empty</p>
                      <Button variant="outline" onClick={closeCart}>
                        Continue Shopping
                      </Button>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex py-4 border-b border-gray-200">
                        <div className="w-20 h-20 flex-shrink-0">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-gray-500 text-sm">
                            {item.size && `Size: ${item.size}`} 
                            {item.color && item.size && ' / '} 
                            {item.color && `Color: ${item.color}`}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <button 
                                className="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-500"
                                onClick={() => decreaseQuantity(item.id)}
                              >
                                -
                              </button>
                              <span className="mx-2 text-sm">{item.quantity}</span>
                              <button 
                                className="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-500"
                                onClick={() => increaseQuantity(item.id)}
                              >
                                +
                              </button>
                            </div>
                            <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                        <button 
                          className="ml-2 text-gray-400 hover:text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="far fa-trash-alt"></i>
                        </button>
                      </div>
                    ))
                  )}
                </div>
                
                {cartItems.length > 0 && (
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex justify-between py-2">
                      <span>Subtotal</span>
                      <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-gray-800 text-white hover:bg-primary transition duration-300 mt-4"
                      onClick={() => {
                        closeCart();
                        navigate("/checkout");
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                    <Button variant="outline" className="w-full border-gray-800 text-gray-800 mt-3" onClick={closeCart}>
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
