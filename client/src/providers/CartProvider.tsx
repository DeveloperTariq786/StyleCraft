import { createContext, useContext, useEffect, useState } from "react";
import { addItemToCart, calculateCartTotal, CartItem, getStoredCart, removeItemFromCart, updateItemQuantity } from "@/lib/cart";
import { Product } from "@shared/schema";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (id: number) => void;
  updateCartItemQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
};

// Create context with default values
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Initialize cart from local storage
  useEffect(() => {
    const storedCart = getStoredCart();
    setCartItems(storedCart);
    setCartTotal(calculateCartTotal(storedCart));
  }, []);

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    const updatedCart = addItemToCart(cartItems, product, quantity, size, color);
    setCartItems(updatedCart);
    setCartTotal(calculateCartTotal(updatedCart));
  };

  const removeFromCart = (id: number) => {
    const updatedCart = removeItemFromCart(cartItems, id);
    setCartItems(updatedCart);
    setCartTotal(calculateCartTotal(updatedCart));
  };

  const updateCartItemQuantity = (id: number, quantity: number) => {
    const updatedCart = updateItemQuantity(cartItems, id, quantity);
    setCartItems(updatedCart);
    setCartTotal(calculateCartTotal(updatedCart));
  };

  const clearCart = () => {
    const emptyCart: CartItem[] = [];
    setCartItems(emptyCart);
    setCartTotal(0);
    localStorage.removeItem('elegante_cart');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
