import { HeroSection } from '@/components/home/hero-section';
import { TopSellerCarousel } from '@/components/home/top-seller-carousel';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Our Top Sellers
          </h2>
          <TopSellerCarousel />
        </div>
      </section>
    </div>
  );
}
