import { ArrowUpRight, Plus } from "lucide-react";
import { ProductVisual } from "../components/ProductVisual";
import { products, type Product } from "../data/products";

export function Collection({
  onSelect,
}: {
  onSelect: (product: Product) => void;
}) {
  return (
    <section
      className="collection-section"
      id="coleccion"
      aria-labelledby="collection-title"
    >
      <div className="section-topline">
        <span>02 / LA COLECCIÓN</span>
        <span>CUATRO SILUETAS. TU PROPIA ESENCIA.</span>
      </div>
      <div className="collection-heading reveal">
        <div>
          <span className="eyebrow">ENCUENTRA TU FORMA</span>
          <h2 id="collection-title">
            Nuestros
            <br />
            <em>sombreros.</em>
          </h2>
        </div>
        <p>
          El mismo origen.
          <br />
          Distintas maneras de llevarlo.
        </p>
      </div>
      <div className="collection-grid">
        {products.map((p, index) => (
          <button
            key={p.id}
            className={`product-card ${index === 0 ? "product-card-featured" : ""}`}
            onClick={() => onSelect(p)}
            aria-label={`Ver ${p.name}`}
          >
            <div className="product-art">
              <span className="product-number">0{index + 1}</span>
              <span className="product-tag">{p.tag}</span>
              <ProductVisual
                type={p.image ? "image" : "svg"}
                src={p.image}
                variant={p.svgVariant}
                color={p.color}
                ribbonColor={p.ribbonColor}
                alt={`Ilustración de ${p.name}`}
              />
              <span className="product-open">
                <Plus size={18} strokeWidth={1.2} />
              </span>
            </div>
            <div className="product-caption">
              <h3>{p.name}</h3>
              <p>{p.shortDescription}</p>
              <span className="product-cta">
                DESCUBRIR <ArrowUpRight size={13} />
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="collection-foot">
        <span>HECHOS A MANO. NUNCA EXACTAMENTE IGUALES.</span>
        <span>Siluetas ilustrativas · Consulta cada pieza</span>
      </div>
    </section>
  );
}
