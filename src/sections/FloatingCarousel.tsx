import type { RefObject } from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { ProductVisual } from "../components/ProductVisual";
import { carouselProducts, orbitItems } from "../data/carousel";

export function FloatingCarousel({
  carouselRef,
  active,
  goToCarousel,
}: {
  carouselRef: RefObject<HTMLElement | null>;
  active: number;
  goToCarousel: (index: number) => void;
}) {
  return (
    <section
      ref={carouselRef}
      className="carousel-section"
      id="siluetas"
      aria-labelledby="carousel-title"
    >
      <div className="carousel-stage">
        <div className="section-topline">
          <span>04 / EN MOVIMIENTO</span>
          <span>UNA TRADICIÓN QUE VA CONTIGO</span>
        </div>
        <div className="carousel-heading">
          <span className="eyebrow">CADA SOMBRERO, UN CARÁCTER</span>
          <h2 id="carousel-title">
            Naturalmente <em>tuyo.</em>
          </h2>
        </div>
        <div className="carousel-dome" aria-hidden="true">
          <svg viewBox="0 0 1000 500">
            <defs>
              <path id="dome-curve" d="M 72 460 A 428 428 0 0 1 928 460" />
            </defs>
            <text>
              <textPath
                href="#dome-curve"
                startOffset="50%"
                textAnchor="middle"
              >
                HANDCRAFTED
              </textPath>
            </text>
          </svg>
          <span>EN ECUADOR, CON ALMA.</span>
        </div>
        <div className="carousel-track" aria-hidden="true">
          {orbitItems.map((p, index) => (
            <div className="carousel-hat" key={`${p.id}-${index}`}>
              <ProductVisual
                src={p.image}
                variant={p.visualVariant}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="carousel-controls">
          <button
            className="icon-button"
            onClick={() => goToCarousel(active - 1)}
            disabled={active === 0}
            aria-label="Sombrero anterior"
          >
            <ArrowLeft size={20} />
          </button>
          <div aria-live="polite">
            <span className="eyebrow">0{active + 1} / 05</span>
            <h3>{carouselProducts[active].name}</h3>
            <a className="carousel-photo-source" href={carouselProducts[active].photoSource} target="_blank" rel="noreferrer">
              FOTO: {carouselProducts[active].photoCredit} ↗
            </a>
            <div className="carousel-dots">
              {carouselProducts.map((p, i) => (
                <button
                  key={p.id}
                  className={active === i ? "active" : ""}
                  onClick={() => goToCarousel(i)}
                  aria-label={`Ver silueta ${i + 1}: ${p.name}`}
                  aria-current={active === i ? "true" : undefined}
                />
              ))}
            </div>
          </div>
          <button
            className="icon-button"
            onClick={() => goToCarousel(active + 1)}
            disabled={active === 4}
            aria-label="Siguiente sombrero"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <span className="carousel-scroll-note">
          SIGUE EXPLORANDO <ArrowDown size={13} />
        </span>
      </div>
    </section>
  );
}
