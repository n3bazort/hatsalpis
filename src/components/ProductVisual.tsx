import type { CSSProperties } from "react";

export type HatVariant =
  | "classic"
  | "wide-brim"
  | "fedora"
  | "traveler"
  | "hero";

export interface ProductVisualProps {
  src?: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  variant?: HatVariant;
  loading?: "eager" | "lazy";
}

const documentaryPhotos: Record<HatVariant, string> = {
  classic: "finished-hat.webp",
  "wide-brim": "hat-details.jpg",
  fedora: "weaving-hands.webp",
  traveler: "hat-shop.webp",
  hero: "hat-shop.webp",
};

/** Uses real documentary product photography throughout the storefront. */
export function ProductVisual({
  src,
  alt,
  className,
  style,
  variant = "classic",
  loading,
}: ProductVisualProps) {
  return (
    <img
      src={src ?? `${import.meta.env.BASE_URL}images/${documentaryPhotos[variant]}`}
      alt={alt}
      className={className}
      style={style}
      loading={loading ?? (variant === "hero" ? "eager" : "lazy")}
      decoding="async"
    />
  );
}

export default ProductVisual;
