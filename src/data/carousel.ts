// Editorial images are deliberately independent of the product catalog.
export const carouselStories = [
  {
    id: "materia-prima", name: "La materia prima",
    image: `${import.meta.env.BASE_URL}images/material-origin.webp`,
    photoSource: "https://montecristicreativa.org/wp-content/uploads/2026/05/9ST202585.webp",
    photoCredit: "Portal Montecristi Ciudad Creativa",
  },
  {
    id: "tejido", name: "El tejido de cerca",
    image: `${import.meta.env.BASE_URL}images/weave-detail.webp`,
    photoSource: "https://www.sombreromontecristi.org/wp-content/uploads/2026/05/7ST204647_result.webp",
    photoCredit: "Oficina Reguladora del Sombrero Montecristi",
  },
  {
    id: "formas", name: "Cada forma, una historia",
    image: `${import.meta.env.BASE_URL}images/hat-details.jpg`,
    photoSource: "https://www.sombreromontecristi.org/wp-content/uploads/2026/05/27-10.jpg",
    photoCredit: "Oficina Reguladora del Sombrero Montecristi",
  },
];
// Each photograph appears once, without cloned neighbors.
export const orbitItems = carouselStories;
