import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { HatMark } from "./HatMark";
import { whatsappUrl } from "../data/products";

export function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#coleccion">
        Saltar a la colección
      </a>
      <header className="site-header">
        <button
          className="header-menu"
          onClick={() => setOpen(true)}
          aria-label="Abrir navegación"
          aria-expanded={open}
        >
          <Menu size={19} strokeWidth={1.4} />
          <span>EXPLORAR</span>
        </button>
        <a
          className="brand"
          href="#inicio"
          aria-label="Hats & Handicrafts, inicio"
        >
          <HatMark className="brand-mark" />
          <span>
            HATS & HANDICRAFTS<small>MONTECRISTI · ECUADOR</small>
          </span>
        </a>
        <a
          className="header-contact"
          aria-label="Conversemos por WhatsApp"
          href={whatsappUrl()}
          target="_blank"
          rel="noreferrer"
        >
          <span>HABLEMOS</span>
          <ArrowUpRight size={19} strokeWidth={1.4} />
        </a>
      </header>
      <dialog
        ref={ref}
        className="menu-dialog"
        onCancel={() => setOpen(false)}
        aria-label="Navegación principal"
      >
        <div className="menu-top">
          <span className="eyebrow">HATS & HANDICRAFTS</span>
          <button
            className="icon-button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar navegación"
          >
            <X />
          </button>
        </div>
        <nav>
          {[
            ["01", "Tierra y legado", "#origen"],
            ["02", "El oficio", "#artesania"],
            ["03", "Los sombreros", "#coleccion"],
            ["04", "Encuentra el tuyo", "#contacto"],
          ].map(([number, label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <span>{number}</span>
              {label}
              <ArrowUpRight />
            </a>
          ))}
        </nav>
        <div className="menu-bottom">
          <span>Tejido a mano. Llevado con alma.</span>
          <span>MONTECRISTI, ECUADOR</span>
        </div>
      </dialog>
    </>
  );
}
