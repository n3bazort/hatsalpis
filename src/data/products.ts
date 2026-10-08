export type HatVariant = "classic" | "wide-brim" | "fedora" | "traveler" | "hero";

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  visualVariant: HatVariant;
  image: string;
  photoSource: string;
  photoCredit: string;
  photoLicense: string;
  photoLicenseUrl: string;
  tag: string;
}

// Licensed reference photographs; stock, exact pieces and prices are confirmed by the shop.
export const products: Product[] = [
  {
    id: "fedora-natural", name: "Fedora Natural",
    visualVariant: "classic",
    shortDescription: "La silueta clásica, con cinta oscura.",
    description: "Copa marcada, ala equilibrada y cinta negra. Una referencia de estilo para quienes buscan una silueta atemporal.",
    image: `${import.meta.env.BASE_URL}images/products/fedora-natural.webp`,
    photoSource: "https://commons.wikimedia.org/wiki/File:Panamahoed,_naturel_met_zwarte_band,_label,_%E2%80%9CCorbeau%E2%80%9D,_objectnr_87074.JPG",
    photoCredit: "Museum Rotterdam",
    photoLicense: "CC BY-SA 3.0",
    photoLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    tag: "CLÁSICO",
  },
  {
    id: "ala-ancha", name: "Ala Ancha",
    visualVariant: "wide-brim",
    shortDescription: "Más sombra. Toda la personalidad.",
    description: "Copa redondeada y un ala generosa, con cinta oscura. Una referencia para quienes prefieren una silueta amplia y relajada.",
    image: `${import.meta.env.BASE_URL}images/products/ala-ancha.webp`,
    photoSource: "https://commons.wikimedia.org/wiki/File:Panamahoed,_naturel_met_zwarte_band,_label,_objectnr_87077.JPG",
    photoCredit: "Museum Rotterdam",
    photoLicense: "CC BY-SA 3.0",
    photoLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    tag: "ALA AMPLIA",
  },
  {
    id: "copa-redonda", name: "Copa Redonda",
    visualVariant: "fedora",
    shortDescription: "Un gesto suave, un detalle especial.",
    description: "Tono claro, copa suave y lazo azul oscuro. Una referencia de estilo con un acabado delicado y un carácter propio.",
    image: `${import.meta.env.BASE_URL}images/products/copa-redonda.webp`,
    photoSource: "https://commons.wikimedia.org/wiki/File:Ronde_dameshoed_van_naturelkleurig_panamastro_,_gedeukte_bol_met_inzet,_brede_rand_en_donkerblauw_ripslint,_platte_strik,_objectnr_76509.JPG",
    photoCredit: "Museum Rotterdam",
    photoLicense: "CC BY-SA 3.0",
    photoLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    tag: "CON LAZO",
  },
  {
    id: "habano", name: "Habano",
    visualVariant: "traveler",
    shortDescription: "Tonos tierra que van contigo.",
    description: "Un tono cálido y cinta marrón, con copa marcada y ala corta. Una referencia para quienes buscan un sombrero con presencia.",
    image: `${import.meta.env.BASE_URL}images/products/habano.webp`,
    photoSource: "https://commons.wikimedia.org/wiki/File:Panamahoed,_bruin_met_bruine_band,_label,_Corbeau,_objectnr_87075.JPG",
    photoCredit: "Museum Rotterdam",
    photoLicense: "CC BY-SA 3.0",
    photoLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    tag: "TONO TIERRA",
  },
 ];

export const phone = "+593967113954";
export function whatsappUrl(message = "Hola, me gustaría conocer los sombreros de paja toquilla disponibles.") {
  return `https://wa.me/${phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}
