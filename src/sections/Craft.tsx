import { ArrowUpRight } from "lucide-react";
import { EditorialGallery } from "../components/EditorialGallery";
import type { InfoTopic } from "../components/Dialogs";

export function Craft({ onTopic }: { onTopic: (topic: InfoTopic) => void }) {
  return (
    <section
      className="craft-section"
      id="artesania"
      aria-labelledby="craft-title"
    >
      <div className="section-topline">
        <span>02 / EL OFICIO</span>
        <span>DEL CULTIVO A LA PIEZA TERMINADA.</span>
      </div>
      <div className="craft-intro reveal">
        <span className="eyebrow">UN OFICIO QUE PASA DE MANO EN MANO.</span>
        <h2 id="craft-title">
          Cada hilo lleva
          <br />
          una <em>historia.</em>
        </h2>
        <p>
          La fibra de paja toquilla pasa por manos que conocen su ritmo.
          <br className="desktop-break" /> Así toma forma un sombrero hecho en
          Montecristi.
        </p>
      </div>
      <EditorialGallery>
        <figure className="editorial-card hands-card">
          <img src={`${import.meta.env.BASE_URL}images/fiber-preparation.webp`} alt="Artesano junto a sombreros de paja toquilla en elaboración" loading="lazy" />
          <figcaption><span>01</span><strong>EL OFICIO TOMA FORMA</strong><a href="https://montecristicreativa.org/wp-content/uploads/2026/05/8ST208459.webp" target="_blank" rel="noreferrer">FUENTE ↗</a></figcaption>
        </figure>
        <figure className="editorial-card weave-card">
          <img src={`${import.meta.env.BASE_URL}images/artesanas-tejiendo.jpg`} alt="Artesanas trabajando en un taller de tejido en Montecristi" loading="lazy" />
          <figcaption><span>02</span><strong>EL SABER DE LAS MANOS</strong><a href="https://www.sombreromontecristi.org/wp-content/uploads/2026/05/3_artesanas-tejiendo_2-scaled.jpg" target="_blank" rel="noreferrer">FUENTE ↗</a></figcaption>
        </figure>
        <figure className="editorial-card center-card">
          <img src={`${import.meta.env.BASE_URL}images/weaving-hands.webp`} alt="Primer plano de manos entrecruzando la fibra" loading="lazy" />
          <span className="center-card-label">EL TEJIDO<br />DE CERCA</span>
          <figcaption><span>03</span><strong>FIBRA HILO A HILO</strong><a href="https://www.sombreromontecristi.org/wp-content/uploads/2026/05/9ST205093_result.webp" target="_blank" rel="noreferrer">FUENTE ↗</a></figcaption>
        </figure>
        <figure className="editorial-card coastal-card">
          <img src={`${import.meta.env.BASE_URL}images/finishing-hat.webp`} alt="Manos dando el acabado final al ala de un sombrero" loading="lazy" />
          <figcaption><span>04</span><strong>EL REMATE</strong><a href="https://montecristicreativa.org/wp-content/uploads/2026/05/6ST207998.webp" target="_blank" rel="noreferrer">FUENTE ↗</a></figcaption>
        </figure>
        <figure className="editorial-card packaging-card">
          <img src={`${import.meta.env.BASE_URL}images/finished-hat.webp`} alt="Artesano mostrando un sombrero ya terminado" loading="lazy" />
          <figcaption><span>05</span><strong>UNA PIEZA CON HISTORIA</strong><a href="https://www.sombreromontecristi.org/wp-content/uploads/2026/05/1ST209505_result.webp" target="_blank" rel="noreferrer">FUENTE ↗</a></figcaption>
        </figure>
      </EditorialGallery>
      <div className="craft-bottom">
        <p>Desde Montecristi, con el valor de lo hecho a mano.</p>
        <button className="text-link" onClick={() => onTopic("materials")}>
          Conoce nuestra fibra <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}
