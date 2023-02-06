import { sizeProduct, variantProduct } from 'prisma/prisma-client';
import React, { createContext, useState, useEffect } from 'react';
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
  priceDefaultId: string;
  discount: number
}

interface CartContextData {
  cartItems: CartItem[];
  getTotalPrice(cart: CartItem[]): {totalPrice: number, totalDiscount: number, totalDiscountInPercentage: number, totalToPay: number};
  addToCart(item: CartItem): void;
  removeFromCart(index: number): void;
  updateQuantity(id: string, quantity: number): void;
  clearCart(): void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cartItems') || '[]'));
  }, []);

  const getTotalPrice = (cart: CartItem[]): {totalPrice: number, totalDiscount: number, totalDiscountInPercentage: number, totalToPay: number} => {
    const totalPrice = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const totalDiscount = cart.reduce((sum, product) => sum + (product.price * product.quantity * product.discount / 100), 0);
    const totalDiscountInPercentage = (totalDiscount / totalPrice) * 100;
    const totalToPay = totalPrice - totalDiscount;

    return {
      totalPrice,
      totalDiscount,
      totalDiscountInPercentage,
      totalToPay,
    };
  }

  const addToCart = (item: CartItem) => {
    if (typeof window !== 'undefined') {
      setCartItems([...cartItems, item]);
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
    }
  };

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((item, i) => i !== index));
    localStorage.setItem('cartItems', JSON.stringify(cartItems.filter((item, i) => i !== index)));
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
