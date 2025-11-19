import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero_main');

  const heroStyle = heroImage
    ? { backgroundImage: `url(${heroImage.imageUrl})` }
    : {};

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center bg-cover bg-center bg-fixed" style={heroStyle}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold mb-4 drop-shadow-lg">
          The Essence of Elegance
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 drop-shadow-md">
          Discover a world of exquisite fragrances, crafted with the finest ingredients from around the globe.
        </p>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6 px-10">
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
}
