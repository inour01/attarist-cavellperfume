export type OlfactoryFamily = 'Floral' | 'Oriental' | 'Woody' | 'Fresh' | 'Chypre' | 'Fougère';

export type Note = 'Bergamot' | 'Rose' | 'Sandalwood' | 'Oud' | 'Vanilla' | 'Jasmine' | 'Patchouli' | 'Vetiver' | 'Amber' | 'Leather' | 'Musk' | 'Pear' | 'Magnolia' | 'Peach' | 'Mandarin Orange' | 'Tuberose' | 'Plum' | 'Violet' | 'Cedar' | 'Blackberry';

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
  hint: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currencyCode: 'USD';
  images: ProductImage[];
  olfactoryFamily: OlfactoryFamily;
  topNotes: Note[];
  middleNotes: Note[];
  baseNotes: Note[];
  size: '10ml' | '30ml' | '50ml' | '100ml';
  isTopSeller: boolean;
  isHazmat: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
