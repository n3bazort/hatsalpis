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
          Cuatro estilos. Tu forma de llevarlos.
          <br />
          Elige una referencia y consulta tu pieza.
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
            <div className="product-photo-source">
              <a href={p.photoSource} target="_blank" rel="noreferrer">Foto: {p.photoCredit}</a>
              <span> · </span><a href={p.photoLicenseUrl} target="_blank" rel="noreferrer">{p.photoLicense}</a>
              <small>Fondo adaptado a blanco</small>
            </div>
          </article>
        ))}
      </div>
      <div className="collection-foot">
        <span>HECHOS A MANO. NUNCA EXACTAMENTE IGUALES.</span>
        <span>Modelos de referencia · confirma pieza, talla y precio</span>
      </div>
    </section>
  );
}
