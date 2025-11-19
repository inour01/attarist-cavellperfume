import { notFound } from 'next/navigation';
import { products } from '@/lib/mock-data';
import { ProductDetailClient } from '@/components/products/product-detail-client';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
