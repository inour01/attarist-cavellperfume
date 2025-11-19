import { ProductFilters } from '@/components/products/product-filters';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 lg:w-72">
          <ProductFilters />
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
