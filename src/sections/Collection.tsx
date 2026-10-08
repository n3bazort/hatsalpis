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
        <span>03 / LA COLECCIÓN</span>
        <span>TRAMAS Y FORMAS DE MONTECRISTI.</span>
      </div>
      <div className="collection-heading reveal">
        <div>
          <span className="eyebrow">ENCUENTRA TU FORMA</span>
          <h2 id="collection-title">
            Sombreros
            <br />
            <em>de aquí.</em>
          </h2>
        </div>
        <p>
          Cada tejido es distinto.
          <br />
          Consulta los modelos disponibles.
        </p>
      </div>
      <div className="collection-grid">
        {products.map((p, index) => (
          <article key={p.id} className={`product-card ${index === 0 ? "product-card-featured" : ""}`}>
            <button
              className="product-card-trigger"
              onClick={() => onSelect(p)}
              aria-label={`Ver ${p.name}`}
            >
              <div className="product-art">
                <span className="product-number">0{index + 1}</span>
                <span className="product-tag">{p.tag}</span>
                <ProductVisual
                  src={p.image}
                  alt={`Fotografía real: ${p.name}`}
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
            <a className="product-photo-source" href={p.photoSource} target="_blank" rel="noreferrer">
              FOTO: {p.photoCredit} ↗
            </a>
          </article>
        ))}
      </div>
      <div className="collection-foot">
        <span>HECHOS A MANO. NUNCA EXACTAMENTE IGUALES.</span>
        <span>Fotografías documentales · disponibilidad por confirmar</span>
      </div>
    </section>
  );
}
