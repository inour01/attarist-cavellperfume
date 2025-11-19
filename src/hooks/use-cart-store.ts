"use client";

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.product.id === product.id);

        let updatedItems;
        if (existingItem) {
          updatedItems = items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedItems = [...items, { product, quantity: 1 }];
        }
        
        set((state) => ({
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
        }));
      },

      removeItem: (productId: string) => {
        set((state) => {
          const itemToRemove = state.items.find((item) => item.product.id === productId);
          if (!itemToRemove) return state;

          const updatedItems = state.items.filter((item) => item.product.id !== productId);
          
          return {
            items: updatedItems,
            totalItems: state.totalItems - itemToRemove.quantity,
            totalPrice: state.totalPrice - itemToRemove.product.price * itemToRemove.quantity,
          };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          const itemToUpdate = state.items.find((item) => item.product.id === productId);
          if (!itemToUpdate) return state;

          const quantityDifference = quantity - itemToUpdate.quantity;

          if (quantity <= 0) {
            const updatedItems = state.items.filter((item) => item.product.id !== productId);
            return {
              items: updatedItems,
              totalItems: state.totalItems - itemToUpdate.quantity,
              totalPrice: state.totalPrice - itemToUpdate.product.price * itemToUpdate.quantity,
            };
          }

          const updatedItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );

          return {
            items: updatedItems,
            totalItems: state.totalItems + quantityDifference,
            totalPrice: state.totalPrice + itemToUpdate.product.price * quantityDifference,
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useCart = () => {
  const store = useCartStore();
  const { toast } = useToast();

  const handleAddItem = (product: Product) => {
    store.addItem(product);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return { ...store, addItem: handleAddItem };
};
