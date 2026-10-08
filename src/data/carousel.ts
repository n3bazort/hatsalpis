import { products, type Product } from "./products";

export const carouselProducts: Product[] = [
  ...products,
  {
    ...products[0],
    id: "heritage",
    name: "El arte de lo natural",
    visualVariant: "hero",
  },
];

// Two neighbors on each side keep the circular composition filled during scrolling.
export const orbitItems = [
  carouselProducts[3],
  carouselProducts[4],
  ...carouselProducts,
  carouselProducts[0],
  carouselProducts[1],
];
