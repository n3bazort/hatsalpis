import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/** Native touch scrolling on small screens; the editorial strip stays intact on desktop. */
export function EditorialGallery({ children }: { children: ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = Children.count(children);

  function syncActive() {
    const gallery = viewport.current;
    if (!gallery) return;
    const bounds = gallery.getBoundingClientRect();
    const center = bounds.left + bounds.width / 2;
    let nearest = 0;
    let distance = Infinity;
    Array.from(
      gallery.querySelectorAll<HTMLElement>(".editorial-card"),
    ).forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const next = Math.abs(rect.left + rect.width / 2 - center);
      if (next < distance) {
        nearest = index;
        distance = next;
      }
    });
    setActive(nearest);
  }

  useEffect(() => {
    const gallery = viewport.current;
    if (!gallery) return;
    const resize = new ResizeObserver(syncActive);
    resize.observe(gallery);
    return () => resize.disconnect();
  }, []);

  function goTo(index: number) {
    const gallery = viewport.current;
    if (!gallery) return;
    const cards = gallery.querySelectorAll<HTMLElement>(".editorial-card");
    const target = cards[Math.max(0, Math.min(total - 1, index))];
    if (!target || !cards[0]) return;
    gallery.scrollTo({
      left: target.offsetLeft - cards[0].offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <>
      <div
        ref={viewport}
        className="editorial-gallery"
        role="region"
        aria-label="Galería de El oficio"
        tabIndex={0}
        onScroll={syncActive}
        onKeyDown={(event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
            return;
          if (!window.matchMedia("(max-width: 700px)").matches) return;
          event.preventDefault();
          goTo(
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? total - 1
                : active + (event.key === "ArrowRight" ? 1 : -1),
          );
        }}
      >
        <div className="editorial-strip">{children}</div>
      </div>
      <div className="editorial-controls">
        <span className="editorial-swipe-hint">DESLIZA PARA DESCUBRIR</span>
        <div className="editorial-navigation">
          <button
            className="icon-button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Imagen anterior del oficio"
          >
            <ArrowLeft size={16} />
          </button>
          <span
            className="editorial-counter"
            aria-live="polite"
            aria-atomic="true"
          >
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <button
            className="icon-button"
            onClick={() => goTo(active + 1)}
            disabled={active === total - 1}
            aria-label="Siguiente imagen del oficio"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
