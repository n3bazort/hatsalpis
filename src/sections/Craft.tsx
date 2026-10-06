import { ArrowUpRight } from "lucide-react";
import { ProductVisual } from "../components/ProductVisual";
import type { InfoTopic } from "../components/Dialogs";

export function Craft({ onTopic }: { onTopic: (topic: InfoTopic) => void }) {
  return (
    <section
      className="craft-section"
      id="artesania"
      aria-labelledby="craft-title"
    >
      <div className="section-topline">
        <span>01 / EL OFICIO</span>
        <span>LO EXTRAORDINARIO TOMA TIEMPO</span>
      </div>
      <div className="craft-intro reveal">
        <span className="eyebrow">NO SE FABRICA. SE TEJE.</span>
        <h2 id="craft-title">
          El lujo está
          <br />
          en el <em>detalle.</em>
        </h2>
        <p>
          Manos que conocen el oficio. Fibras que guardan el sol.
          <br className="desktop-break" /> Sombreros con una historia que
          continúa contigo.
        </p>
      </div>
      <div className="editorial-strip">
        <figure className="editorial-card hands-card">
          <img
            src={`${import.meta.env.BASE_URL}images/weaving-hands.svg`}
            alt="Ilustración del trabajo artesanal de tejido de paja toquilla"
            loading="lazy"
          />
          <figcaption>
            <span>01</span> EL SABER DE LAS MANOS
          </figcaption>
        </figure>
        <figure className="editorial-card weave-card">
          <img
            src={`${import.meta.env.BASE_URL}images/weave-detail.svg`}
            alt="Estudio ilustrado de la textura de la fibra natural tejida"
            loading="lazy"
          />
          <figcaption>
            <span>02</span> FIBRA CON ALMA
          </figcaption>
        </figure>
        <figure className="editorial-card center-card">
          <span className="center-card-label">
            EL ORIGINAL
            <br />
            MONTECRISTI
          </span>
          <ProductVisual
            variant="classic"
            alt="Estudio ilustrado de un sombrero artesanal Montecristi"
          />
          <figcaption>
            <span>03</span> UNA FORMA DE SER
          </figcaption>
        </figure>
        <figure className="editorial-card coastal-card">
          <img
            src={`${import.meta.env.BASE_URL}images/coastal-study.svg`}
            alt="Ilustración editorial de una persona con sombrero de ala ancha"
            loading="lazy"
          />
          <figcaption>
            <span>04</span> HECHO PARA ACOMPAÑARTE
          </figcaption>
        </figure>
        <figure className="editorial-card packaging-card">
          <img
            src={`${import.meta.env.BASE_URL}images/packaging.svg`}
            alt="Estudio ilustrado de una caja de sombrero artesanal"
            loading="lazy"
          />
          <figcaption>
            <span>05</span> CADA DETALLE CUENTA
          </figcaption>
        </figure>
      </div>
      <div className="craft-bottom">
        <p>Desde Montecristi, con el valor de lo hecho a mano.</p>
        <button className="text-link" onClick={() => onTopic("materials")}>
          Conoce nuestra fibra <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}
