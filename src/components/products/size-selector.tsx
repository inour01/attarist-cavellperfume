'use client';

import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { ProductVariant } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onVariantChange: (variant: ProductVariant) => void;
}

export function SizeSelector({ variants, selectedVariantId, onVariantChange }: SizeSelectorProps) {
  return (
    <div>
      <Label className="font-semibold mb-2 block">Size</Label>
      <RadioGroup
        value={selectedVariantId}
        onValueChange={(variantId) => {
          const newVariant = variants.find(v => v.id === variantId);
          if (newVariant) {
            onVariantChange(newVariant);
          }
        }}
        className="flex gap-2"
      >
        {variants.map((variant) => (
          <Label
            key={variant.id}
            htmlFor={variant.id}
            className={cn(
                "border rounded-md px-4 py-2 flex items-center justify-center text-sm font-medium cursor-pointer transition-colors",
                selectedVariantId === variant.id 
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "bg-background hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <RadioGroupItem value={variant.id} id={variant.id} className="sr-only" />
            {variant.size}
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
