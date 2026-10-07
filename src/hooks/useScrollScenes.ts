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
        // Entrance, idle drift and scroll flight each own a separate layer.
        const restingRotation = Number(
          gsap.getProperty(".hero-product-inner", "rotation"),
        );
        let entranceComplete = false;
        let heroVisible = true;
        const idleFloat = gsap.to(".hero-product-float", {
          x: 2,
          y: -8,
          rotation: 0.65,
          duration: 4.5,
          paused: true,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        const entrance = gsap.timeline({
          onComplete: () => {
            entranceComplete = true;
            if (heroVisible) idleFloat.play();
          },
        });
        entrance
          .fromTo(".hero-impact-glow",
            { scale: 0.035, opacity: 0 },
            { scale: 0.18, opacity: 1, duration: 0.42, ease: "power2.in" }, 0)
          .to(".hero-impact-glow",
            { scale: 1.8, opacity: 0, duration: 0.85, ease: "expo.out" }, 0.42)
          .fromTo(".hero-impact-ring",
            { scale: 0.08, opacity: 0.75 },
            { scale: 1.75, opacity: 0, duration: 1, stagger: 0.08,
              immediateRender: false, ease: "expo.out" }, 0.42)
          .fromTo(".hero-product-inner",
            { opacity: 0, scale: 0.08, rotation: -75, y: 35 },
            { opacity: 1, scale: 1.65, rotation: restingRotation + 22,
              y: -65, duration: 0.42, ease: "expo.out" }, 0.44)
          .to(".hero-product-inner",
            { scale: 0.97, rotation: restingRotation - 4, y: 8,
              duration: 0.65, ease: "power3.inOut" }, 0.86)
          .to(".hero-product-inner",
            { scale: 1, rotation: restingRotation, y: 0,
              duration: 0.8, ease: "power2.out" }, 1.51)
          .fromTo(".hero-copy",
            { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power2.out" }, 1.05)
          .fromTo(".hero-kicker, .hero-side, .hero-bottom",
            { opacity: 0 }, { opacity: 1, duration: 0.7, stagger: 0.1 }, 1.3);

        // Deterministic trajectories keep each replay stable and inexpensive.
        gsap.utils.toArray<HTMLElement>(".hero-fiber").forEach((fiber, index) => {
          const angle = (index * 137.508 * Math.PI) / 180;
          const radius = Math.min(window.innerWidth * 0.52, 520) *
            (0.55 + (index % 7) * 0.075);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.7;
          const rotation = index * 47;
          entrance.fromTo(fiber,
            { x: 0, y: 0, opacity: 0, scale: 0.2, rotation },
            { x, y, opacity: 0.8, scale: index % 6 === 0 ? 1.8 : 1,
              rotation: rotation + 110, duration: 0.48, ease: "expo.out",
              immediateRender: false }, 0.43 + (index % 4) * 0.015)
            .to(fiber, { x: x * 1.12, y: y + 65 + (index % 5) * 12,
              rotation: rotation + 180, opacity: 0, scale: 0.6,
              duration: 1.45, ease: "power1.out" }, 0.97);
        });
        ScrollTrigger.create({
          trigger: ".hero",
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            heroVisible = self.isActive;
            if (heroVisible && entranceComplete) idleFloat.play();
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
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
          gsap.from(el, {
            y: 35,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 91%", once: true },
          }),
        );
      });

      // On mobile, native horizontal scrolling owns the gallery's position.
      mm.add(
        "(min-width: 701px) and (prefers-reduced-motion: no-preference)",
        () => {
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
        },
      );

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
