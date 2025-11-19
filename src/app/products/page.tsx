'use client';

import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/products/product-card';
import type { Product } from '@/lib/types';
import { useMemo } from 'react';

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const filteredProducts = useMemo(() => {
    const family = searchParams.get('family');
    const note = searchParams.get('note');
    const size = searchParams.get('size');

    return products.filter((product: Product) => {
      if (family && product.olfactoryFamily !== family) {
        return false;
      }
      if (note && ![...product.topNotes, ...product.middleNotes, ...product.baseNotes].includes(note as any)) {
        return false;
      }
      if (size && product.size !== size) {
        return false;
      }
      return true;
    });
  }, [searchParams]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-headline">No Products Found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
