/** Social image used when a page has no image of its own (public/og-image.jpg). */
export interface OgImage {
  src: string;
  width: number;
  height: number;
  type: string;
  alt: string;
}

export const defaultOgImage: OgImage = {
  src: '/og-image.jpg',
  width: 1792,
  height: 592,
  type: 'image/jpeg',
  alt: 'Nerds in Shirts',
};
