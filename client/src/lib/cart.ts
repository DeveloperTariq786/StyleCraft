import { Product } from "@shared/schema";

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
}

// Local storage key
const CART_STORAGE_KEY = 'elegante_cart';

// Get cart from local storage
export const getStoredCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (!storedCart) return [];
  
  try {
    return JSON.parse(storedCart);
  } catch (error) {
    console.error('Failed to parse cart from local storage:', error);
    return [];
  }
};

// Save cart to local storage
export const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Add item to cart
export const addItemToCart = (
  cart: CartItem[],
  product: Product,
  quantity: number = 1,
  size?: string,
  color?: string
): CartItem[] => {
  const existingItemIndex = cart.findIndex(
    (item) => 
      item.id === product.id && 
      item.size === size && 
      item.color === color
  );

  if (existingItemIndex > -1) {
    // Update existing item
    const updatedCart = [...cart];
    updatedCart[existingItemIndex].quantity += quantity;
    saveCartToStorage(updatedCart);
    return updatedCart;
  } else {
    // Add new item
    const newCart = [
      ...cart,
      {
        ...product,
        quantity,
        size,
        color,
      },
    ];
    saveCartToStorage(newCart);
    return newCart;
  }
};

// Remove item from cart
export const removeItemFromCart = (cart: CartItem[], itemId: number): CartItem[] => {
  const newCart = cart.filter((item) => item.id !== itemId);
  saveCartToStorage(newCart);
  return newCart;
};

// Update item quantity
export const updateItemQuantity = (
  cart: CartItem[],
  itemId: number,
  quantity: number
): CartItem[] => {
  const updatedCart = cart.map((item) =>
    item.id === itemId ? { ...item, quantity } : item
  );
  saveCartToStorage(updatedCart);
  return updatedCart;
};

// Calculate cart total
export const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};
