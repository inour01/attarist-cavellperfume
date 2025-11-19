'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
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

      addItem: (product: Product, variant: ProductVariant) => {
        const { items } = get();
        const existingItem = items.find((item) => item.variant.id === variant.id);

        let updatedItems;
        if (existingItem) {
          updatedItems = items.map((item) =>
            item.variant.id === variant.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedItems = [...items, { product, variant, quantity: 1 }];
        }
        
        set((state) => ({
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + variant.price,
        }));
      },

      removeItem: (variantId: string) => {
        set((state) => {
          const itemToRemove = state.items.find((item) => item.variant.id === variantId);
          if (!itemToRemove) return state;

          const updatedItems = state.items.filter((item) => item.variant.id !== variantId);
          
          return {
            items: updatedItems,
            totalItems: state.totalItems - itemToRemove.quantity,
            totalPrice: state.totalPrice - itemToRemove.variant.price * itemToRemove.quantity,
          };
        });
      },

      updateQuantity: (variantId: string, quantity: number) => {
        set((state) => {
          const itemToUpdate = state.items.find((item) => item.variant.id === variantId);
          if (!itemToUpdate) return state;

          const quantityDifference = quantity - itemToUpdate.quantity;

          if (quantity <= 0) {
            const updatedItems = state.items.filter((item) => item.variant.id !== variantId);
            return {
              items: updatedItems,
              totalItems: state.totalItems - itemToUpdate.quantity,
              totalPrice: state.totalPrice - itemToUpdate.variant.price * itemToUpdate.quantity,
            };
          }

          const updatedItems = state.items.map((item) =>
            item.variant.id === variantId ? { ...item, quantity } : item
          );

          return {
            items: updatedItems,
            totalItems: state.totalItems + quantityDifference,
            totalPrice: state.totalPrice + itemToUpdate.variant.price * quantityDifference,
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

  const handleAddItem = (product: Product, variant: ProductVariant) => {
    store.addItem(product, variant);
    toast({
      title: 'Added to Cart',
      description: `${product.name} (${variant.size}) has been added to your cart.`,
    });
  };

  return { ...store, addItem: handleAddItem };
};
