'use client';

import { useState } from 'react';
import { ProductImageGallery } from '@/components/products/product-image-gallery';
import { OlfactoryPyramid } from '@/components/products/olfactory-pyramid';
import { AddToCartButton } from '@/components/cart/add-to-cart-button';
import { formatPrice } from '@/lib/utils';
import { HazmatWarning } from '@/components/products/hazmat-warning';
import { SizeSelector } from '@/components/products/size-selector';
import type { Product, ProductVariant } from '@/lib/types';

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="w-full max-w-[600px] mx-auto">
           <ProductImageGallery images={product.images} />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-accent">{formatPrice(selectedVariant.price)}</p>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <SizeSelector 
            variants={product.variants}
            selectedVariantId={selectedVariant.id}
            onVariantChange={handleVariantChange}
          />

          <OlfactoryPyramid
            topNotes={product.topNotes}
            middleNotes={product.middleNotes}
            baseNotes={product.baseNotes}
          />
          
          {selectedVariant.isHazmat && <HazmatWarning />}

          <AddToCartButton product={product} variant={selectedVariant} size="lg" />
        </div>
      </div>
    </div>
  );
}
