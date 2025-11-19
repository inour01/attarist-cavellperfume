'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart-store';
import type { Product, ProductVariant } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps extends ButtonProps {
  product: Product;
  variant: ProductVariant;
}

export function AddToCartButton({ product, variant, className, ...props }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <Button
      onClick={() => addItem(product, variant)}
      className={cn('bg-primary text-primary-foreground hover:bg-primary/90', className)}
      {...props}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
