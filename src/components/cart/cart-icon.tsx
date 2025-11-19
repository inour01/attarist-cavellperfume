'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart-store';
import { CartSheet } from './cart-sheet';
import { useState, useEffect } from 'react';

export function CartIcon() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        {isClient && totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
            {totalItems}
          </span>
        )}
        <span className="sr-only">Open cart</span>
      </Button>
      <CartSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
