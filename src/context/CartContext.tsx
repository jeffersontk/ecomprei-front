import { sizeProduct, variantProduct } from 'prisma/prisma-client';
import React, { createContext, useState } from 'react';
import { sizeType } from '../utils/types/productsType';

interface CartProviderProps  {
  children: React.ReactNode
}

interface CartItem {
  id: string;
  title: string;
  price: number;
  imgUrl: string
  sizes: sizeType[]
  variantColors: variantProduct[]
  quantity: number;
  colorSelect?: string;
  sizeSelect?: string;
}

interface CartContextData {
  cartItems: CartItem[];
  getTotalPrice(cart: CartItem[]): number;
  addToCart(item: CartItem): void;
  removeFromCart(index: number): void;
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
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((item, i) => i !== index));
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
