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
      <Card className="flex-1 overflow-hidden">
        <div className="relative aspect-[3/4]">
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain transition-opacity duration-300"
            data-ai-hint={selectedImage.hint}
          />
        </div>
      </Card>
    </div>
  );
}
