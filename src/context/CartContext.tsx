import { sizeProduct, variantProduct } from 'prisma/prisma-client';
import React, { createContext, useState } from 'react';

interface CartProviderProps  {
  children: React.ReactNode
}

interface CartItem {
  id: string;
  title: string;
  price: number;
  imgUrl: string
  sizes: sizeProduct[]
  variantColors: variantProduct[]
  quantity: number;
}

interface CartContextData {
  cartItems: CartItem[];
  getTotalPrice(cart: CartItem[]): number;
  addToCart(item: CartItem): void;
  removeFromCart(id: string): void;
  updateQuantity(id: string, quantity: number): void;
  clearCart(): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getTotalPrice = (cart: CartItem[]): number => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  const addToCart = (item: CartItem) => {
    if (!cartItems.find(existingItem => existingItem.id === item.id)) {
    setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
