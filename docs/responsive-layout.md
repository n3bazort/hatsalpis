# Responsive layout contract

- Hero geometry lives in `src/hero-responsive.css`, loaded after legacy styles.
  Edit those rules rather than adding competing overrides to styles.css.
- Account for both viewport width and height. Do not reintroduce desktop minimum
  heights of 800–850px: laptop browser windows can have only 600px of usable height.
- Keep the header compact, title below it, and hat including animated bounds
  above the collection link. Keep room for the idle translation and rotation.
- Below 540px viewport height, permit vertical scrolling. Never hide essential
  content or shrink text indefinitely just to force it into one screen.
- Preserve reduced-motion support and keyboard/touch navigation.
- Run `npm run test:e2e` before publishing changes to layout or animation. The
  viewport matrix checks the animated SVG bounds, not merely page overflow.
- Review desktop, portrait tablet, narrow phone and landscape screenshots.
  Decorative entrance particles may leave the frame; the settled product must fit.
