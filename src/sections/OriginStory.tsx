import { ArrowUpRight } from "lucide-react";

export function OriginStory() {
  return (
    <section className="origin-story" id="origen" aria-labelledby="origin-title">
      <div className="section-topline">
        <span>01 / TIERRA Y LEGADO</span>
        <span>MONTECRISTI · MANABÍ · ECUADOR</span>
      </div>
      <div className="origin-story-main">
        <figure className="origin-landscape">
          <img
            src={`${import.meta.env.BASE_URL}images/toquilla-grove.jpg`}
            alt="Cultivo de paja toquilla en una finca de Montecristi"
            loading="lazy"
          />
          <figcaption>
            La fibra comienza su camino en la tierra de Manabí.
            <a
              href="https://www.sombreromontecristi.org/wp-content/uploads/2026/05/1_sombrero-en-toquillal_3-scaled.jpg"
              target="_blank"
              rel="noreferrer"
            >
              FOTO · OFICINA REGULADORA ↗
            </a>
          </figcaption>
        </figure>
        <div className="origin-copy">
          <span className="eyebrow">ANTES DE SER SOMBRERO, ES TERRITORIO.</span>
          <h2 id="origin-title">
            La historia empieza <em>en la fibra.</em>
          </h2>
          <p>
            El recorrido empieza en el cultivo y sigue con la cosecha y la
            preparación de la fibra. Después llegan el tejido, el remate y el
            acabado: conocimientos que se aprenden y se transmiten en
            Montecristi.
          </p>
          <a
            className="text-link"
            href="https://www.sombreromontecristi.org/proceso-de-certificacion/"
            target="_blank"
            rel="noreferrer"
          >
            Conoce el recorrido de la fibra <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="origin-recognition" aria-label="Reconocimientos y origen">
        <article className="recognition-card creative-city-card">
          <img
            src={`${import.meta.env.BASE_URL}images/ciudad-creativa.png`}
            alt="Montecristi, Ciudad Creativa de Artesanía y Arte Popular, miembro de la Red de Ciudades Creativas UNESCO"
            loading="lazy"
          />
          <div>
            <span className="eyebrow">UNA CIUDAD CREADORA</span>
            <p>
              Montecristi forma parte de la Red de Ciudades Creativas de UNESCO
              en artesanía y arte popular.
            </p>
            <a href="https://montecristicreativa.org/wp-content/uploads/2026/05/cropped-Logo-Ciudad-Creativa-Artesania-y-Arte-Popular-2_Mesa-de-trabajo-1.png" target="_blank" rel="noreferrer">
              FUENTE: MONTECRISTI CREATIVA ↗
            </a>
          </div>
        </article>
        <article className="recognition-card origin-seal-card">
          <img
            src={`${import.meta.env.BASE_URL}images/denominacion-origen.png`}
            alt="Logotipo de la Oficina Reguladora del Sombrero Montecristi y Denominación de Origen"
            loading="lazy"
          />
          <div>
            <span className="eyebrow">ORIGEN QUE SE PUEDE VERIFICAR</span>
            <p>
              La Denominación de Origen vincula el sombrero con su procedencia
              y saber hacer. Consulta con la Oficina Reguladora si una pieza
              específica cuenta con sello o trazabilidad verificada.
            </p>
            <a
              href="https://www.sombreromontecristi.org/wp-content/uploads/2026/04/cropped-logoOKoficina-e1776867619457.png"
              target="_blank"
              rel="noreferrer"
            >
              FUENTE: OFICINA REGULADORA ↗
            </a>
          </div>
        </article>
      </div>
      <p className="origin-credit-note">
        Las fotografías se reproducen con autorización del cliente. Cada imagen
        incluye un enlace directo a la fuente de origen.
      </p>
    </section>
  );
}
