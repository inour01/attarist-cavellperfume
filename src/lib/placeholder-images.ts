import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export function getImage(id: string) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    // In a real app, you might want to return a default placeholder
    // or throw a more specific error.
    throw new Error(`Image with id "${id}" not found.`);
  }
  return {
    id: image.id,
    url: image.imageUrl,
    alt: image.description,
    hint: image.imageHint,
  };
}
