import type { CSSProperties } from "react";

export interface ProductVisualProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
}

/** Explicit photo source; the animated hero has its own independent component. */
export function ProductVisual({ src, alt, className, style, loading = "lazy" }: ProductVisualProps) {
  return <img src={src} alt={alt} className={className} style={style} loading={loading} decoding="async" />;
}
