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
        <span>04 / TU PRÓXIMA HISTORIA</span>
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
          variant="hero"
          alt="Sombrero Montecristi de paja toquilla ilustrado"
        />
      </div>
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
