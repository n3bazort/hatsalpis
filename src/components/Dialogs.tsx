import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { ProductVisual } from "./ProductVisual";
import { whatsappUrl } from "../data/products";
import type { Product } from "../data/products";

export type InfoTopic = "materials" | "care" | null;

export function ProductDialog({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [size, setSize] = useState("Por definir");
  useEffect(() => {
    if (product) {
      setSize("Por definir");
      ref.current?.showModal();
    } else ref.current?.close();
  }, [product]);
  return (
    <dialog
      ref={ref}
      className="product-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="product-dialog-title"
    >
      {product && (
        <div className="product-dialog-inner">
          <button
            className="icon-button dialog-close"
            onClick={onClose}
            aria-label="Cerrar detalle"
          >
            <X size={22} />
          </button>
          <div className="dialog-visual">
            <span className="eyebrow">ENCUENTRA TU ESTILO</span>
            <ProductVisual
              src={product.image}
              alt={`Fotografía real de ${product.name}`}
            />
            <div className="visual-note">
              <a href={product.photoSource} target="_blank" rel="noreferrer">Foto: {product.photoCredit}</a>
              <span> · </span><a href={product.photoLicenseUrl} target="_blank" rel="noreferrer">{product.photoLicense}</a>
              <small>Fondo adaptado a blanco</small>
            </div>
          </div>
          <div className="dialog-details">
            <span className="eyebrow">{product.tag} — MODELO DE REFERENCIA</span>
            <h2 id="product-dialog-title">{product.name}</h2>
            <p>{product.description}</p>
            <p className="product-reference-note">Te confirmamos la pieza, el precio y la talla disponible por WhatsApp.</p>
            <fieldset className="size-picker">
              <legend>Tu talla aproximada</legend>
              {["S · 54–55", "M · 56–57", "L · 58–59", "Por definir"].map(
                (s) => (
                  <label key={s} className={size === s ? "selected" : ""}>
                    <input
                      type="radio"
                      name="size"
                      value={s}
                      checked={size === s}
                      onChange={() => setSize(s)}
                    />
                    {s}
                  </label>
                ),
              )}
            </fieldset>
            <p className="sizing-note">
              Medidas en cm. Te ayudamos a encontrar el ajuste ideal.
            </p>
            <a
              className="button button-solid"
              href={whatsappUrl(
                `Hola, me interesa el modelo ${product.name}. Mi talla aproximada es ${size}. ¿Qué sombreros tienen disponibles y cuáles son sus precios?`,
              )}
              target="_blank"
              rel="noreferrer"
            >
              Consultar esta pieza <ArrowUpRight size={18} />
            </a>
            <span className="dialog-footnote">
              <Check size={14} /> Atención personal por WhatsApp
            </span>
          </div>
        </div>
      )}
    </dialog>
  );
}

export function InfoDialog({
  topic,
  onClose,
}: {
  topic: InfoTopic;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (topic) ref.current?.showModal();
    else ref.current?.close();
  }, [topic]);
  return (
    <dialog
      ref={ref}
      className="info-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="info-title"
    >
      <div className="info-inner">
        <button
          className="icon-button dialog-close"
          onClick={onClose}
          aria-label="Cerrar información"
        >
          <X size={22} />
        </button>
        <span className="eyebrow">EL VALOR DE LO NATURAL</span>
        <h2 id="info-title">
          {topic === "materials"
            ? "Una fibra. Mil historias."
            : "Una pieza para cuidar."}
        </h2>
        {topic === "materials" ? (
          <>
            <p>
              La paja toquilla es una fibra vegetal que se transforma, hilo a
              hilo, en un tejido ligero y flexible. En Montecristi, el oficio
              del tejido forma parte de una tradición que pasa de una generación
              a otra.
            </p>
            <p>
              Las pequeñas variaciones de tono, textura y forma son parte del
              carácter de una pieza artesanal. El tejido, acabado y medidas de
              cada sombrero se confirman al realizar tu consulta.
            </p>
          </>
        ) : (
          <div className="care-list">
            <p>
              <b>01 — Tómalo por el ala.</b> Evita pellizcar la copa para
              conservar su forma.
            </p>
            <p>
              <b>02 — Guárdalo con calma.</b> Déjalo en un lugar fresco y seco,
              lejos del sol directo y sin peso encima.
            </p>
            <p>
              <b>03 — Limpia con suavidad.</b> Usa un paño suave apenas húmedo.
              Evita sumergirlo o aplicar productos agresivos.
            </p>
            <p>
              <b>04 — Protege su silueta.</b> No lo enrolles ni lo dobles. Si se
              moja, deja que se seque al aire, sin calor directo.
            </p>
          </div>
        )}
        <a
          className="text-link"
          href={whatsappUrl(
            "Hola, tengo una consulta sobre los materiales o el cuidado de un sombrero.",
          )}
          target="_blank"
          rel="noreferrer"
        >
          Te ayudamos con tus dudas <ArrowUpRight size={16} />
        </a>
      </div>
    </dialog>
  );
}
