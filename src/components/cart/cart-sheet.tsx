'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart-store';
import { formatPrice } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { CartItem } from '@/lib/types';
import { HazmatWarning } from '../products/hazmat-warning';
import Link from 'next/link';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { items, totalPrice, totalItems, removeItem, clearCart } = useCart();
  const hasHazmatItem = items.some(item => item.product.isHazmat);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        <Separator />
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 p-6">
                {items.map((item) => (
                  <CartItemRow key={item.product.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="p-6 sm:justify-start">
              <div className="w-full space-y-4">
                {hasHazmatItem && <HazmatWarning />}
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Proceed to Checkout
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button asChild onClick={() => onOpenChange(false)}>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();
  return (
    <div className="flex items-start gap-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-md">
        <Image
          src={item.product.images[0].url}
          alt={item.product.images[0].alt}
          fill
          sizes="96px"
          className="object-cover"
          data-ai-hint={item.product.images[0].hint}
        />
      </div>
      <div className="flex-1 space-y-2">
        <div className="font-semibold">{item.product.name}</div>
        <div className="text-sm text-muted-foreground">{formatPrice(item.product.price)}</div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => removeItem(item.product.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
