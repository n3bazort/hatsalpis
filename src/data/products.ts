export type HatVariant =
  | "classic"
  | "wide-brim"
  | "fedora"
  | "traveler"
  | "hero";

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  visualVariant: HatVariant;
  image: string;
  photoSource: string;
  photoCredit: string;
  tag: string;
}

export const products: Product[] = [
  {
    id: "pieza-terminada",
    name: "Pieza terminada",
    shortDescription: "La forma toma vida en las manos que tejen.",
    description:
      "Fotografía documental de un sombrero de paja toquilla trabajado en Montecristi. Cada pieza varía en forma, tono y finura; escríbenos para conocer los modelos disponibles en tienda.",
    visualVariant: "classic",
    image: `${import.meta.env.BASE_URL}images/finished-hat.webp`,
    photoSource:
      "https://www.sombreromontecristi.org/wp-content/uploads/2026/05/1ST209505_result.webp",
    photoCredit: "Oficina Reguladora del Sombrero Montecristi",
    tag: "PIEZA TERMINADA",
  },
  {
    id: "trama",
    name: "La trama",
    shortDescription: "Un tejido que se descubre de cerca.",
    description:
      "Un primer plano del tejido de paja toquilla. La textura y la finura se aprecian en cada cruce de las fibras; consulta las características de las piezas disponibles.",
    visualVariant: "wide-brim",
    image: `${import.meta.env.BASE_URL}images/weaving-hands.webp`,
    photoSource:
      "https://www.sombreromontecristi.org/wp-content/uploads/2026/05/9ST205093_result.webp",
    photoCredit: "Oficina Reguladora del Sombrero Montecristi",
    tag: "TEJIDO A MANO",
  },
  {
    id: "detalle",
    name: "El detalle",
    shortDescription: "Fibras y sombreros, vistos de cerca.",
    description:
      "Una mirada cercana a la textura del sombrero ya tejido. Cada pieza tiene pequeñas particularidades; te ayudamos a encontrar la que buscas.",
    visualVariant: "fedora",
    image: `${import.meta.env.BASE_URL}images/hat-details.jpg`,
    photoSource:
      "https://www.sombreromontecristi.org/wp-content/uploads/2026/05/27-10.jpg",
    photoCredit: "Oficina Reguladora del Sombrero Montecristi",
    tag: "FIBRA NATURAL",
  },
  {
    id: "oficio",
    name: "El oficio",
    shortDescription: "El sombrero en su lugar de origen.",
    description:
      "Fotografía del trabajo y la vida alrededor del sombrero en Montecristi. Consulta qué modelos, tonos y medidas están disponibles actualmente.",
    visualVariant: "traveler",
    image: `${import.meta.env.BASE_URL}images/hat-shop.webp`,
    photoSource:
      "https://montecristicreativa.org/wp-content/uploads/2026/05/10ST200341-scaled.jpg",
    photoCredit: "Portal Montecristi Ciudad Creativa",
    tag: "MONTECRISTI",
  },
];

export const phone = "+593967113954";
export function whatsappUrl(
  message = "Hola, me gustaría conocer los sombreros de paja toquilla disponibles.",
) {
  return `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}
