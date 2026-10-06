import { ArrowUpRight } from "lucide-react";
import { HatMark } from "../components/HatMark";
import type { InfoTopic } from "../components/Dialogs";

export function BrandPanel({
  onTopic,
}: {
  onTopic: (topic: InfoTopic) => void;
}) {
  return (
    <section className="brand-panel" aria-labelledby="brand-panel-title">
      <div className="brand-panel-top">
        <HatMark className="panel-mark" />
        <span>UNA TIERRA. UN OFICIO. UNA IDENTIDAD.</span>
        <span>MONTECRISTI — ECUADOR</span>
      </div>
      <div className="brand-statement reveal">
        <span className="eyebrow">EL ARTE DE LLEVAR UNA HISTORIA</span>
        <h2 id="brand-panel-title">
          HATS &<br />
          <span>HANDICRAFTS</span>
        </h2>
        <p>
          Hecho a mano. <em>Llevado con alma.</em>
        </p>
      </div>
      <div className="brand-panel-bottom">
        <p>
          Hay cosas que solo
          <br />
          el tiempo sabe hacer.
        </p>
        <div className="brand-links">
          <a href="#coleccion">
            <span>01</span>Colección
            <ArrowUpRight size={16} />
          </a>
          <button onClick={() => onTopic("materials")}>
            <span>02</span>Materiales
            <ArrowUpRight size={16} />
          </button>
          <button onClick={() => onTopic("care")}>
            <span>03</span>Cuidado
            <ArrowUpRight size={16} />
          </button>
          <a href="#contacto">
            <span>04</span>Contacto
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
