import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { ProductVisual } from "../components/ProductVisual";
import { whatsappUrl } from "../data/products";

export function Closing() {
  return (
    <section
      className="closing-section"
      id="contacto"
      aria-labelledby="closing-title"
    >
      <div className="section-topline">
        <span>05 / TU PRÓXIMA HISTORIA</span>
        <a href="#inicio">
          VOLVER AL ORIGEN <ArrowUpRight size={13} />
        </a>
      </div>
      <div className="closing-copy reveal">
        <span className="eyebrow">
          LAS BUENAS HISTORIAS EMPIEZAN CON UN HOLA
        </span>
        <h2 id="closing-title">
          Tu sombrero.
          <br />
          <em>Tu historia.</em>
        </h2>
        <p>Te ayudamos a encontrar esa pieza que se siente como tú.</p>
        <a
          className="button button-solid"
          href={whatsappUrl()}
          target="_blank"
          rel="noreferrer"
        >
          Conversemos por WhatsApp <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="closing-wordmark" aria-hidden="true">
        MONTECRISTI
      </div>
      <div className="closing-hat">
        <ProductVisual
          src={`${import.meta.env.BASE_URL}images/hat-shop.webp`}
          alt="Una artesana presenta sombreros en una tienda de Montecristi"
        />
      </div>
      <a className="closing-photo-source" href="https://montecristicreativa.org/wp-content/uploads/2026/05/10ST200341-scaled.jpg" target="_blank" rel="noreferrer">
        FOTO: MONTECRISTI CIUDAD CREATIVA ↗
      </a>
      <div className="closing-bottom">
        <span>
          DE MONTECRISTI
          <br />
          PARA EL MUNDO.
        </span>
        <a href="tel:+593967113954">
          096 711 3954 <MoveUpRight size={15} />
        </a>
      </div>
    </section>
  );
}
