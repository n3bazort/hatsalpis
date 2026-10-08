import { ArrowDown, Asterisk } from "lucide-react";
import { ProductVisual } from "../components/ProductVisual";

function HandmadeSeal() {
  return (
    <div className="handmade-seal" aria-label="Hecho a mano en Ecuador">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path
            id="seal-circle"
            d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
          />
        </defs>
        <text>
          <textPath href="#seal-circle" textLength="265">
            HECHO A MANO · HECHO CON ALMA ·{" "}
          </textPath>
        </text>
        <path
          d="M60 36v48M36 60h48M43 43l34 34M43 77l34-34"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle
          cx="60"
          cy="60"
          r="12"
          fill="var(--paper)"
          stroke="currentColor"
        />
        <circle cx="60" cy="60" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-kicker eyebrow">
        DE NUESTRAS MANOS. A TU HISTORIA.
      </div>
      <div className="hero-copy">
        <h1 id="hero-title">
          <span>MONTECRISTI</span>
          <span className="hero-hats">
            <i className="title-dash" />
            HATS
            <i className="title-dash" />
          </span>
        </h1>
      </div>
      <div className="hero-side hero-side-left">
        <Asterisk
          className="mini-star"
          size={31}
          strokeWidth={1}
          aria-hidden="true"
        />
        <p>
          El tiempo se teje.
          <br />
          El estilo permanece.
        </p>
        <span className="eyebrow">PAJA TOQUILLA NATURAL</span>
      </div>
      <div className="hero-product">
        <div className="hero-impact" aria-hidden="true">
          <span className="hero-impact-glow" />
          {Array.from({ length: 36 }, (_, index) => (
            <span
              key={index}
              className={`hero-fiber${index % 6 === 0 ? " hero-fiber-near" : ""}`}
            />
          ))}
          <span className="hero-impact-ring" />
          <span className="hero-impact-ring hero-impact-ring-outer" />
        </div>
        <div className="hero-product-inner">
          <div className="hero-product-float">
            <ProductVisual
              variant="hero"
              alt="Artesano trabajando en el ala de un sombrero en Montecristi"
              loading="eager"
              className="hero-hat-photo"
            />
          </div>
        </div>
        <a
          className="hero-photo-credit"
          href="https://montecristicreativa.org/wp-content/uploads/2026/05/10ST200341-scaled.jpg"
          target="_blank"
          rel="noreferrer"
        >
          FOTO · MONTECRISTI CIUDAD CREATIVA ↗
        </a>
      </div>
      <div className="hero-side hero-side-right">
        <HandmadeSeal />
        <p>
          Una pieza de Ecuador.
          <br />
          Para llevar al mundo.
        </p>
      </div>
      <div className="hero-bottom">
        <span className="corner-note">
          ORIGEN
          <br />
          <b>MONTECRISTI, ECUADOR</b>
        </span>
        <a className="discover-link" href="#coleccion">
          DESCUBRE LA COLECCIÓN <ArrowDown size={17} />
        </a>
        <span className="corner-note align-right">
          FIBRA NATURAL.
          <br />
          <b>ESPÍRITU ATEMPORAL.</b>
        </span>
      </div>
      <span className="hero-edition" aria-hidden="true">
        MANABÍ — ECUADOR
      </span>
    </section>
  );
}
