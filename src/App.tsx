import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Header } from "./components/Header";
import { HatMark } from "./components/HatMark";
import {
  InfoDialog,
  ProductDialog,
  type InfoTopic,
} from "./components/Dialogs";
import type { Product } from "./data/products";
import { Hero } from "./sections/Hero";
import { Craft } from "./sections/Craft";
import { Collection } from "./sections/Collection";
import { BrandPanel } from "./sections/BrandPanel";
import { FloatingCarousel } from "./sections/FloatingCarousel";
import { Closing } from "./sections/Closing";
import { useScrollScenes } from "./hooks/useScrollScenes";

export default function App() {
  const { root, carouselRef, active, goToCarousel } = useScrollScenes();
  const [selected, setSelected] = useState<Product | null>(null);
  const [topic, setTopic] = useState<InfoTopic>(null);

  return (
    <div ref={root}>
      <Header />
      <main>
        <Hero />
        <Craft onTopic={setTopic} />
        <Collection onSelect={setSelected} />
        <BrandPanel onTopic={setTopic} />
        <FloatingCarousel
          carouselRef={carouselRef}
          active={active}
          goToCarousel={goToCarousel}
        />
        <Closing />
      </main>
      <footer className="site-footer">
        <a className="footer-brand" href="#inicio">
          <HatMark className="footer-mark" />
          <span>
            HATS & HANDICRAFTS<small>MONTECRISTI · ECUADOR</small>
          </span>
        </a>
        <span>Hecho con tiempo. Para durar en tu historia.</span>
        <a href="https://hatsfalpis.com" target="_blank" rel="noreferrer">
          hatsfalpis.com <ArrowUpRight size={14} />
        </a>
      </footer>
      <ProductDialog product={selected} onClose={() => setSelected(null)} />
      <InfoDialog topic={topic} onClose={() => setTopic(null)} />
    </div>
  );
}
