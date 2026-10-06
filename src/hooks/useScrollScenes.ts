import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { carouselProducts } from "../data/carousel";

gsap.registerPlugin(ScrollTrigger);

/** Orchestrates the scroll scenes, keeping section components focused on content. */
export function useScrollScenes() {
  const root = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    let disposed = false;
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-copy, .hero-side, .hero-bottom, .handmade-seal", {
          opacity: 0,
          y: 20,
          duration: 1.1,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "transform",
        });
        gsap.from(".hero-product-inner", {
          opacity: 0,
          y: 50,
          rotate: 4,
          duration: 1.5,
          ease: "power3.out",
        });
        // Separate transforms let the subtle idle motion coexist with the
        // entrance animation and the outer scroll-driven flight.
        const idleFloat = gsap.to(".hero-product-float", {
          x: 2,
          y: -8,
          rotation: 0.65,
          duration: 4.5,
          delay: 1.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        ScrollTrigger.create({
          trigger: ".hero",
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (self.isActive) idleFloat.play();
            else idleFloat.pause();
          },
        });
        gsap.to(".hero-product", {
          y: () => -window.innerHeight * 0.84,
          x: () => window.innerWidth * 0.04,
          rotate: -18,
          scale: 0.73,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(".hero-copy", {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.fromTo(
          ".editorial-strip",
          { y: 110, x: 35 },
          {
            y: -65,
            x: -35,
            ease: "none",
            scrollTrigger: {
              trigger: ".craft-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          ".collection-grid",
          { y: 90 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: ".collection-section",
              start: "top 85%",
              end: "bottom 25%",
              scrub: 1,
            },
          },
        );

        function addVisibilityTimeline(
          sectionSelector: string,
          target: string,
        ) {
          const section =
            root.current?.querySelector<HTMLElement>(sectionSelector);
          if (!section) return;

          // Timeline units represent viewport heights: fully visible when the
          // section reaches 20%, then held until its bottom leaves that point.
          const holdDuration = section.offsetHeight / window.innerHeight;
          const timeline = gsap
            .timeline({ paused: true, defaults: { ease: "none" } })
            .fromTo(target, { opacity: 0.35 }, { opacity: 1, duration: 0.8 })
            .to(target, { opacity: 1, duration: holdDuration })
            .to(target, { opacity: 0.35, duration: 0.2 });
          const [, hold, exit] = timeline.getChildren(false, true, false);

          ScrollTrigger.create({
            trigger: section,
            animation: timeline,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
            onRefreshInit: () => {
              const nextHoldDuration =
                section.offsetHeight / window.innerHeight;
              hold.duration(nextHoldDuration);
              exit.startTime(0.8 + nextHoldDuration);
            },
          });
        }

        addVisibilityTimeline(".craft-section", ".editorial-strip");
        addVisibilityTimeline(".collection-section", ".collection-grid");
        gsap.from(".brand-panel", {
          y: 140,
          ease: "none",
          scrollTrigger: {
            trigger: ".brand-panel",
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        });
        gsap.from(".closing-hat", {
          y: 180,
          rotate: 9,
          scale: 1.16,
          ease: "none",
          scrollTrigger: {
            trigger: ".closing-section",
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        });
        gsap.utils
          .toArray<HTMLElement>(".reveal")
          .forEach((el) =>
            gsap.from(el, {
              y: 35,
              opacity: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 91%", once: true },
            }),
          );
      });

      const hats = gsap.utils.toArray<HTMLElement>(".carousel-hat");
      const renderOrbit = (progress: number) => {
        const position = progress * (carouselProducts.length - 1);
        const width = window.innerWidth;
        const gap = width * (width < 700 ? 0.55 : 0.24);
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        hats.forEach((hat, i) => {
          const distance = i - 2 - position;
          const proximity = Math.min(Math.abs(distance), 2);
          gsap.set(hat, {
            x: distance * gap,
            y: proximity * (width < 700 ? -25 : -40),
            xPercent: -50,
            yPercent: -50,
            scale: 1.18 - proximity * 0.18,
            rotation: reduced ? 0 : distance * 12,
            opacity: Math.abs(distance) > 2.9 ? 0 : 1 - proximity * 0.09,
            zIndex: Math.round(10 - proximity * 3),
          });
        });
        const next = Math.round(position);
        if (next !== activeRef.current) {
          activeRef.current = next;
          setActive(next);
        }
      };
      renderOrbit(0);
      ScrollTrigger.create({
        trigger: ".carousel-section",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => renderOrbit(self.progress),
        onRefresh: (self) => renderOrbit(self.progress),
      });
    }, root);

    document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => {
      disposed = true;
      mm.revert();
      ctx.revert();
    };
  }, []);

  function goToCarousel(index: number) {
    const section = carouselRef.current;
    if (!section) return;
    const lastIndex = carouselProducts.length - 1;
    const clamped = Math.max(0, Math.min(lastIndex, index));
    const top = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo({
      top:
        top +
        (section.offsetHeight - window.innerHeight) * (clamped / lastIndex),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return { root, carouselRef, active, goToCarousel };
}
