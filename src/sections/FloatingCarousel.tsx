import type { RefObject } from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { ProductVisual } from "../components/ProductVisual";
import { carouselStories, orbitItems } from "../data/carousel";

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
          <span>04 / MIRADAS DE MONTECRISTI</span>
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
            aria-label="Imagen anterior"
          >
            <ArrowLeft size={20} />
          </button>
          <div aria-live="polite">
            <span className="eyebrow">0{active + 1} / 0{carouselStories.length}</span>
            <h3>{carouselStories[active].name}</h3>
            <a className="carousel-photo-source" href={carouselStories[active].photoSource} target="_blank" rel="noreferrer">
              FOTO: {carouselStories[active].photoCredit} ↗
            </a>
            <div className="carousel-dots">
              {carouselStories.map((p, i) => (
                <button
                  key={p.id}
                  className={active === i ? "active" : ""}
                  onClick={() => goToCarousel(i)}
                  aria-label={`Ver historia ${i + 1}: ${p.name}`}
                  aria-current={active === i ? "true" : undefined}
                />
              ))}
            </div>
          </div>
          <button
            className="icon-button"
            onClick={() => goToCarousel(active + 1)}
            disabled={active === carouselStories.length - 1}
            aria-label="Siguiente imagen"
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
