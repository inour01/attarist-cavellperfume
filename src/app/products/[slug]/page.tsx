import { notFound } from 'next/navigation';
import { products } from '@/lib/mock-data';
import { ProductImageGallery } from '@/components/products/product-image-gallery';
import { OlfactoryPyramid } from '@/components/products/olfactory-pyramid';
import { AddToCartButton } from '@/components/cart/add-to-cart-button';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { HazmatWarning } from '@/components/products/hazmat-warning';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <ProductImageGallery images={product.images} />

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-headline font-bold">{product.name}</h1>
              <Badge variant="outline">{product.size}</Badge>
            </div>
            <p className="text-2xl font-semibold text-accent">{formatPrice(product.price)}</p>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <OlfactoryPyramid
            topNotes={product.topNotes}
            middleNotes={product.middleNotes}
            baseNotes={product.baseNotes}
          />
          
          {product.isHazmat && <HazmatWarning />}

          <AddToCartButton product={product} size="lg" />
        </div>
      </div>
    </div>
  );
}
