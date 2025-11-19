import { Product } from '@/lib/types';
import { getImage } from './placeholder-images';

export const products: Product[] = [
  {
    id: 'prod_adore',
    name: 'Adore',
    slug: 'adore',
    description: "Adore | Inspired | Cavell Spray Perfume Gift For Women Pear Peach Jasmine Plum Vanilla Blackberry\n\nAdore opens with an inviting blend of juicy pear, soft magnolia, luscious peach, and a hint of bright mandarin orange, creating a fresh and vibrant first impression. As the scent unfolds, the heart reveals an elegant bouquet of jasmine and tuberose, enriched by the depth of plum and violet, adding a layer of floral sophistication and allure. Finally, the base lingers with a warm and sensual blend of creamy vanilla, rich cedar, and dark blackberry, leaving a trail that is both comforting and unforgettable. Adore is a perfect balance of fruity freshness, floral elegance, and warm woodiness—an enchanting fragrance that celebrates femininity and grace.\n\nThis listing consists of:\n0.34 oz (10 ml), and 1 oz (30 ml).\nConcentration: extrait de parfum.\nDesigned for: Women\nPackaging: packaged in a nice small gift box.\nVegan, cruelty free, Paraben and Phthalate free.\n\nTop notes:\nPear, Magnolia, Peach, Mandarin Orange\nMiddle notes:\nJasmine, Tuberose, Plum, Violet\nBase notes:\nVanilla, Cedar, Blackberry\n\nThis fragrance is independently crafted. I want to clarify that there is no connection, partnership, or affiliation between Cavell Parfums and the mentioned perfume names. Any brand names referenced are solely for comparison purposes to help customers understand the scent profile. This is not meant to mislead or infringe on the brands' trademarks and copyrights. Please note that my products are distinct interpretations and do not originate from the original designers.",
    images: [
      getImage('prod_adore_1'),
      getImage('prod_adore_2'),
      getImage('prod_adore_3'),
    ],
    olfactoryFamily: 'Floral',
    topNotes: ['Pear', 'Magnolia', 'Peach', 'Mandarin Orange'],
    middleNotes: ['Jasmine', 'Tuberose', 'Plum', 'Violet'],
    baseNotes: ['Vanilla', 'Cedar', 'Blackberry'],
    isTopSeller: true,
    currencyCode: 'USD',
    variants: [
      {
        id: 'variant_adore_10',
        size: '10ml',
        price: 25,
        isHazmat: false,
      },
      {
        id: 'variant_adore_30',
        size: '30ml',
        price: 55,
        isHazmat: false,
      },
    ],
  },
];

export const olfactoryFamilies = [
  ...new Set(products.map((p) => p.olfactoryFamily)),
];

export const allNotes = [
  ...new Set(
    products.flatMap((p) => [...p.topNotes, ...p.middleNotes, ...p.baseNotes])
  ),
];

export const sizes = [...new Set(products.flatMap((p) => p.variants.map(v => v.size)))].sort(
  (a, b) => parseInt(a) - parseInt(b)
);
