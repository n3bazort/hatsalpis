// Editorial images are deliberately independent of the product catalog.
export const carouselStories = [
  {
    imageZoom: 1.52, id: "materia-prima", name: "Todo empieza en la tierra.", shortName: "La fibra",
    kicker: "01 — EL ORIGEN", alt: "Preparación de la fibra vegetal para el tejido",
    description: "Antes del primer hilo, una fibra natural y el saber de quienes la trabajan.",
    image: `${import.meta.env.BASE_URL}images/material-origin.webp`,
    photoSource: "https://montecristicreativa.org/wp-content/uploads/2026/05/9ST202585.webp",
    photoCredit: "Portal Montecristi Ciudad Creativa",
  },
  {
    imageZoom: 1, id: "tejido", name: "El tiempo, entrelazado.", shortName: "El tejido",
    kicker: "02 — LA TEXTURA", alt: "Detalle de las fibras entrelazadas de un sombrero",
    description: "Acércate. En cada cruce se reconoce el ritmo de un trabajo paciente.",
    image: `${import.meta.env.BASE_URL}images/weave-detail.webp`,
    photoSource: "https://www.sombreromontecristi.org/wp-content/uploads/2026/05/7ST204647_result.webp",
    photoCredit: "Oficina Reguladora del Sombrero Montecristi",
  },
  {
    imageZoom: 1, id: "formas", name: "Ninguno es igual a otro.", shortName: "La forma",
    kicker: "03 — EL CARÁCTER", alt: "Sombreros de paja toquilla terminados, vistos de cerca",
    description: "Pequeñas diferencias que hacen que una pieza se sienta tuya.",
    image: `${import.meta.env.BASE_URL}images/hat-details.jpg`,
    photoSource: "https://www.sombreromontecristi.org/wp-content/uploads/2026/05/27-10.jpg",
    photoCredit: "Oficina Reguladora del Sombrero Montecristi",
  },
];
