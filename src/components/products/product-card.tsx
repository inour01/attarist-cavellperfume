'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { AddToCartButton } from '@/components/cart/add-to-cart-button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const currentImage = product.images[0];
  const startingPrice = Math.min(...product.variants.map(v => v.price));

  return (
    <Card className="overflow-hidden group relative transition-shadow duration-300 hover:shadow-xl">
      <CardContent className="p-0">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-[3/4] relative overflow-hidden">
            {currentImage?.url && (
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={currentImage.hint}
              />
            )}
          </div>
        </Link>
        <div className="p-4 space-y-2">
          <h3 className="font-headline text-xl font-semibold truncate">
            <Link href={`/products/${product.slug}`} className="hover:text-accent transition-colors">
              {product.name}
            </Link>
          </h3>
          <p className="text-lg font-medium text-muted-foreground">
            From {formatPrice(startingPrice)}
          </p>
        </div>
        <div className="p-4 pt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <AddToCartButton product={product} variant={product.variants[0]} className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
