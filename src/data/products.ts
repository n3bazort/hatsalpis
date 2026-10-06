export type HatVariant =
  "classic" | "wide-brim" | "fedora" | "traveler" | "hero";
export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  svgVariant: HatVariant;
  image?: string;
  color: string;
  ribbonColor: string;
  tag: string;
}
export const products: Product[] = [
  {
    id: "classic",
    name: "Classic Montecristi",
    shortDescription: "La esencia de un clásico.",
    description:
      "Una silueta atemporal de paja toquilla natural, con copa definida y cinta oscura. La elección para acompañarte del día a la noche. Consulta las tallas, el tejido y la disponibilidad de cada pieza.",
    svgVariant: "classic",
    color: "#ddc397",
    ribbonColor: "#342b26",
    tag: "EL ICÓNICO",
  },
  {
    id: "wide-brim",
    name: "Wide Brim",
    shortDescription: "Un poco más de sombra.",
    description:
      "Su ala amplia y su perfil delicado invitan a disfrutar los días al aire libre. Una interpretación relajada del sombrero artesanal ecuatoriano. Consulta las tallas, el tejido y la disponibilidad de cada pieza.",
    svgVariant: "wide-brim",
    color: "#e8d5ae",
    ribbonColor: "#875832",
    tag: "ALMA LIBRE",
  },
  {
    id: "fedora",
    name: "Fedora Natural",
    shortDescription: "Carácter en cada curva.",
    description:
      "Copa esculpida, fibra natural y una cinta de tono cálido. Un sombrero con presencia, pensado para encontrar su lugar en tu estilo. Consulta las tallas, el tejido y la disponibilidad de cada pieza.",
    svgVariant: "fedora",
    color: "#caa572",
    ribbonColor: "#9b6f3e",
    tag: "CON CARÁCTER",
  },
  {
    id: "traveler",
    name: "Traveler Hat",
    shortDescription: "Tu próxima historia.",
    description:
      "Una silueta versátil de espíritu viajero. La textura de la paja toquilla suma un detalle natural a los momentos cotidianos. Consulta las tallas, el tejido y la disponibilidad de cada pieza.",
    svgVariant: "traveler",
    color: "#dec9a1",
    ribbonColor: "#4b5140",
    tag: "SIN PRISA",
  },
];
export const phone = "+593967113954";
export function whatsappUrl(
  message = "Hola, me gustaría conocer más sobre los sombreros de Hats & Handicrafts.",
) {
  return `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}
