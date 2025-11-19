'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ProductImage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';

interface ProductImageGalleryProps {
  images: ProductImage[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-2">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={cn(
              'relative h-20 w-20 rounded-md overflow-hidden ring-2 ring-transparent transition-all hover:ring-accent focus:outline-none focus:ring-accent',
              { 'ring-primary': selectedImage.id === image.id }
            )}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="80px"
              className="object-cover"
              data-ai-hint={image.hint}
            />
          </button>
        ))}
      </div>
      <div className="w-full">
        <Card className="overflow-hidden flex justify-center items-center p-4">
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              width={600}
              height={800}
              priority
              className="object-contain h-auto w-full max-h-[70vh]"
              data-ai-hint={selectedImage.hint}
            />
        </Card>
      </div>
    </div>
  );
}
