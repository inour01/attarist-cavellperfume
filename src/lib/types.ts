export type OlfactoryFamily = 'Floral' | 'Oriental' | 'Woody' | 'Fresh' | 'Chypre' | 'Fougère';

export type Note = 'Bergamot' | 'Rose' | 'Sandalwood' | 'Oud' | 'Vanilla' | 'Jasmine' | 'Patchouli' | 'Vetiver' | 'Amber' | 'Leather' | 'Musk' | 'Pear' | 'Magnolia' | 'Peach' | 'Mandarin Orange' | 'Tuberose' | 'Plum' | 'Violet' | 'Cedar' | 'Blackberry';

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
  hint: string;
};

export type ProductVariant = {
  id: string;
  size: '10ml' | '30ml' | '50ml' | '100ml';
  price: number;
  isHazmat: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: ProductImage[];
  olfactoryFamily: OlfactoryFamily;
  topNotes: Note[];
  middleNotes: Note[];
  baseNotes: Note[];
  variants: ProductVariant[];
  isTopSeller: boolean;
  currencyCode: 'USD';
};

export type CartItem = {
  product: Product;
  variant: ProductVariant;
  quantity: number;
};
