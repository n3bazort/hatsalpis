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

// Add only isolated product photographs with documented commercial-use rights.
// Documentary photos belong to the editorial sections and must never be sellable.
export const products: Product[] = [];

export const phone = "+593967113954";
export function whatsappUrl(
  message = "Hola, me gustaría conocer los sombreros de paja toquilla disponibles.",
) {
  return `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}
