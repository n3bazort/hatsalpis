import { useRef, type CSSProperties, type RefObject } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { carouselStories } from "../data/carousel";

export function FloatingCarousel({ carouselRef, active, goToCarousel }: {
  carouselRef: RefObject<HTMLElement | null>; active: number; goToCarousel: (index: number) => void;
}) {
  const touchStart = useRef<number | null>(null);
  return (
    <section ref={carouselRef} className="carousel-section story-section" id="siluetas" aria-labelledby="carousel-title">
      <div className="story-stage">
        <div className="section-topline"><span>04 / MIRADAS DE MONTECRISTI</span><span>UN ORIGEN. MIL DETALLES.</span></div>
        <div className="story-viewport"
          onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
          onTouchEnd={event => {
            if (touchStart.current !== null) {
              const delta = touchStart.current - event.changedTouches[0].clientX;
              if (Math.abs(delta) > 45) goToCarousel(active + (delta > 0 ? 1 : -1));
            }
            touchStart.current = null;
          }}>
          <div className="story-overline"><span>DE CERCA, TODO CAMBIA.</span><span>0{active + 1} / 0{carouselStories.length}</span></div>
          <h2 id="carousel-title" className="story-heading">Naturalmente <em>tuyo.</em></h2>
          {carouselStories.map((story, index) => (
            <figure className="story-frame" style={{ "--photo-zoom": story.imageZoom } as CSSProperties} data-active={active === index} key={story.id} aria-hidden={active !== index} inert={active !== index}>
              <img src={story.image} alt={story.alt} loading="lazy" />
              <figcaption>
                <span className="eyebrow">{story.kicker}</span>
                <h3>{story.name}</h3>
                <p>{story.description}</p>
                <a href={story.photoSource} target="_blank" rel="noreferrer">FOTO: {story.photoCredit} <ArrowUpRight size={12} /></a>
              </figcaption>
            </figure>
          ))}
          <span className="story-scroll-note">DESLIZA Y DESCUBRE <ArrowDown size={14} /></span>
        </div>
        <div className="story-controls" aria-label="Navegar por las historias">
          <button className="icon-button" onClick={() => goToCarousel(active - 1)} disabled={active === 0} aria-label="Imagen anterior"><ArrowLeft size={19} /></button>
          <div className="story-steps">
            {carouselStories.map((story, index) => <button key={story.id} onClick={() => goToCarousel(index)}
              className={active === index ? "active" : ""} aria-label={`Ver historia ${index + 1}: ${story.name}`}
              aria-current={active === index ? "step" : undefined}><span>0{index + 1}</span><span>{story.shortName}</span><i /></button>)}
          </div>
          <button className="icon-button" onClick={() => goToCarousel(active + 1)} disabled={active === carouselStories.length - 1} aria-label="Siguiente imagen"><ArrowRight size={19} /></button>
          <span className="sr-only" aria-live="polite">{carouselStories[active].name}</span>
        </div>
      </div>
    </section>
  );
}
