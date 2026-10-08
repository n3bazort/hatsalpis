import { Children, cloneElement, isValidElement, useRef, useState, type ReactNode, type ReactElement } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** One generous photograph at a time, with crossfades, touch and keyboard navigation. */
export function EditorialGallery({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const items = Children.toArray(children);
  const total = items.length;
  const goTo = (index: number) => setActive(Math.max(0, Math.min(total - 1, index)));

  return (
    <div className="craft-presentation">
      <div className="editorial-gallery" role="region" aria-label="Galería de El oficio" tabIndex={0}
        onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={event => {
          if (touchStart.current === null) return;
          const delta = touchStart.current - event.changedTouches[0].clientX;
          if (Math.abs(delta) > 45) goTo(active + (delta > 0 ? 1 : -1));
          touchStart.current = null;
        }}
        onKeyDown={event => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          goTo(event.key === "Home" ? 0 : event.key === "End" ? total - 1 : active + (event.key === "ArrowRight" ? 1 : -1));
        }}>
        <div className="editorial-strip">
          {items.map((child, index) => isValidElement(child) ? cloneElement(child as ReactElement<{className: string; "aria-hidden": boolean; inert: boolean}>, {
            className: `${(child.props as {className?: string}).className ?? ""} ${index === active ? "is-active" : ""}`,
            "aria-hidden": index !== active,
            inert: index !== active,
          }) : child)}
        </div>
        <span className="craft-image-label" aria-hidden="true">MANOS QUE GUARDAN HISTORIAS</span>
      </div>
      <div className="editorial-controls">
        <div className="craft-step-dots" aria-label="Etapas del oficio">
          {items.map((_, index) => <button key={index} className={index === active ? "active" : ""}
            aria-label={`Ver etapa ${index + 1} del oficio`} aria-current={index === active ? "step" : undefined}
            onClick={() => goTo(index)}><span>0{index + 1}</span><i /></button>)}
        </div>
        <div className="editorial-navigation">
          <button className="icon-button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Imagen anterior del oficio"><ArrowLeft size={18} /></button>
          <span className="editorial-counter" aria-live="polite" aria-atomic="true">0{active + 1} / 0{total}</span>
          <button className="icon-button" onClick={() => goTo(active + 1)} disabled={active === total - 1} aria-label="Siguiente imagen del oficio"><ArrowRight size={18} /></button>
        </div>
      </div>
    </div>
  );
}
