import { useId, type CSSProperties } from "react";

export type HatVariant =
  "classic" | "wide-brim" | "fedora" | "traveler" | "hero";

export interface ProductVisualProps {
  type?: "svg" | "image";
  src?: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  variant?: HatVariant;
  color?: string;
  ribbonColor?: string;
}

type HatProps = Omit<ProductVisualProps, "type" | "src" | "variant">;

/** Original vector illustration. All the weave, shading and silhouette are SVG. */
function HatIllustration({
  alt,
  className,
  style,
  variant = "classic",
  color,
  ribbonColor,
}: Omit<ProductVisualProps, "type" | "src">) {
  const id = `hat-${useId().replace(/:/g, "")}`;
  const wide = variant === "wide-brim";
  const traveler = variant === "traveler";
  const fedora = variant === "fedora";
  const hero = variant === "hero";
  const straw =
    color || (traveler ? "#d8b47b" : fedora ? "#e4cfa3" : "#f0dfbb");
  const ribbon =
    ribbonColor || (traveler ? "#73503b" : wide ? "#5a392d" : "#332a23");
  const brim = wide
    ? "M42 347C58 310 160 276 262 275L532 270C630 270 740 303 760 346C791 411 650 462 423 466C207 470 15 418 42 347Z"
    : traveler
      ? "M86 346C111 304 196 279 266 276L532 273C625 275 703 299 725 336C762 393 637 446 427 455C229 464 57 411 86 346Z"
      : "M61 348C79 307 174 278 263 275L532 272C632 274 728 304 748 346C779 408 645 455 424 460C218 465 33 416 61 348Z";
  const crown = fedora
    ? "M228 308C235 250 241 180 269 119C285 84 326 84 374 99C395 106 414 109 436 103C472 93 514 82 533 107C560 143 573 224 589 302C573 338 486 353 400 350C318 347 250 334 228 308Z"
    : "M226 308C234 247 241 173 268 119C287 79 332 86 378 100C401 108 427 108 451 102C485 93 514 89 533 113C557 144 573 228 590 303C570 338 489 353 400 350C319 347 248 332 226 308Z";
  const band = traveler
    ? "M234 273C297 304 365 314 427 314C489 314 543 303 581 280L587 305C548 335 480 347 400 343C326 340 260 326 228 307Z"
    : "M236 258C285 287 362 301 427 301C486 301 541 289 577 270L587 309C547 338 480 349 400 345C322 342 255 328 228 307Z";
  return (
    <svg
      viewBox="0 0 800 560"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-labelledby={`${id}-title`}
      focusable="false"
    >
      <title id={`${id}-title`}>{alt}</title>
      <defs>
        <linearGradient
          id={`${id}-straw`}
          x1="0.08"
          y1="0.18"
          x2="0.94"
          y2="0.7"
        >
          <stop offset="0" stopColor="#fff5dc" />
          <stop offset="0.25" stopColor={straw} />
          <stop offset="0.62" stopColor={straw} />
          <stop offset="0.88" stopColor="#c7a778" />
          <stop offset="1" stopColor="#ad895b" />
        </linearGradient>
        <linearGradient id={`${id}-brim`} x1="0.18" y1="0" x2="0.79" y2="1">
          <stop offset="0" stopColor="#bca070" />
          <stop offset="0.34" stopColor={straw} />
          <stop offset="0.68" stopColor="#f6e8c9" />
          <stop offset="0.93" stopColor={straw} />
          <stop offset="1" stopColor="#c7a571" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#ebd7af" />
          <stop offset="1" stopColor="#ab8653" />
        </linearGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="1" y2="0.4">
          <stop stopColor={ribbon} />
          <stop offset="0.38" stopColor={ribbon} />
          <stop offset="0.68" stopColor="#24201c" />
          <stop offset="1" stopColor={ribbon} />
        </linearGradient>
        <linearGradient id={`${id}-dent`} x1="0" y1="0" x2="0.3" y2="1">
          <stop stopColor="#ae8e60" stopOpacity="0.85" />
          <stop offset="0.45" stopColor="#c8ad7c" stopOpacity="0.42" />
          <stop offset="1" stopColor="#f7e8c8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-fold`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#7e5c35" stopOpacity="0" />
          <stop offset="0.6" stopColor="#7e5c35" stopOpacity="0.24" />
          <stop offset="1" stopColor="#fff3d5" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id={`${id}-brim-light`} cx="0.45" cy="0.91" r="0.66">
          <stop stopColor="#fff8e7" stopOpacity="0.65" />
          <stop offset="1" stopColor="#fff8e7" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-cast`}>
          <stop stopColor="#513519" stopOpacity="0.31" />
          <stop offset="1" stopColor="#513519" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`${id}-weave`}
          width="9"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-8)"
        >
          <path
            d="M-2 2L3 5M2-2L9 3M7-1L12 2M-3 6L2 9M5 5L10 8"
            stroke="#97784c"
            strokeOpacity="0.3"
            strokeWidth="0.65"
          />
          <path
            d="M-1 1L4 4M3-3L10 2M6 4L11 7"
            stroke="#fff9e9"
            strokeOpacity="0.63"
            strokeWidth="0.75"
          />
          <path
            d="M1 6L7 1M7 8L12 4"
            stroke="#947244"
            strokeOpacity="0.15"
            strokeWidth="0.55"
          />
        </pattern>
        <pattern
          id={`${id}-ribbon-texture`}
          width="3.4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 0V4"
            stroke="#f7e3c1"
            strokeWidth="0.6"
            strokeOpacity="0.12"
          />
          <path
            d="M1.5 0V4"
            stroke="#000"
            strokeWidth="0.5"
            strokeOpacity="0.16"
          />
        </pattern>
        <filter
          id={`${id}-soft-shadow`}
          x="-30%"
          y="-100%"
          width="160%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <clipPath id={`${id}-crown-clip`}>
          <path d={crown} />
        </clipPath>
        <clipPath id={`${id}-brim-clip`}>
          <path d={brim} />
        </clipPath>
      </defs>

      <ellipse
        cx="411"
        cy="484"
        rx="251"
        ry="20"
        fill="#57432d"
        opacity="0.13"
        filter={`url(#${id}-soft-shadow)`}
      />
      <g
        transform={`rotate(${hero ? -8 : traveler ? 5 : wide ? -5 : -7} 400 285)`}
      >
        <path d={brim} transform="translate(0 5)" fill={`url(#${id}-rim)`} />
        <path
          d={brim}
          fill={`url(#${id}-brim)`}
          stroke="#c1a579"
          strokeWidth="1.1"
        />
        <g clipPath={`url(#${id}-brim-clip)`}>
          <path d={brim} fill={`url(#${id}-weave)`} opacity="0.74" />
          {Array.from({ length: 34 }, (_, index) => (
            <ellipse
              key={`brim-ring-${index}`}
              cx="408"
              cy="303"
              rx={168 + index * 6.1}
              ry={42 + index * 3.67}
              fill="none"
              stroke={index % 3 === 0 ? "#997b4f" : "#fff9e7"}
              strokeOpacity={index % 3 === 0 ? 0.17 : 0.48}
              strokeWidth={index % 3 === 0 ? 0.72 : 0.6}
            />
          ))}
          {Array.from({ length: 52 }, (_, index) => {
            const angle = (index / 52) * Math.PI * 2;
            return (
              <path
                key={`brim-fiber-${index}`}
                d={`M${408 + Math.cos(angle) * 177} ${300 + Math.sin(angle) * 50}Q${408 + Math.cos(angle) * 295} ${314 + Math.sin(angle) * 115} ${408 + Math.cos(angle) * 450} ${320 + Math.sin(angle) * 180}`}
                fill="none"
                stroke="#967449"
                strokeOpacity="0.09"
                strokeWidth="0.65"
              />
            );
          })}
          <path d={brim} fill={`url(#${id}-brim-light)`} />
          <ellipse
            cx="415"
            cy="324"
            rx="227"
            ry="76"
            fill={`url(#${id}-cast)`}
          />
          <path
            d="M82 379C154 431 302 453 442 449C568 446 673 421 729 382"
            fill="none"
            stroke="#fff2d6"
            strokeOpacity="0.7"
            strokeWidth="1.6"
          />
        </g>

        <path
          d={crown}
          fill={`url(#${id}-straw)`}
          stroke="#c6aa7d"
          strokeWidth="0.75"
        />
        <g clipPath={`url(#${id}-crown-clip)`}>
          <path
            d="M259 130C293 104 332 127 368 137C403 147 436 146 470 129C493 118 512 116 536 136C518 108 510 91 484 96C445 101 435 113 400 110C345 109 302 75 278 107Z"
            fill={`url(#${id}-dent)`}
          />
          <path
            d="M273 118C302 100 347 129 384 135C421 142 450 134 478 123C498 115 513 119 528 133"
            fill="none"
            stroke="#fff2d3"
            strokeOpacity="0.72"
            strokeWidth="3.5"
          />
          <path
            d="M264 138C280 158 288 179 288 219C286 256 289 280 301 298L245 279C250 222 250 174 264 138Z"
            fill={`url(#${id}-fold)`}
          />
          <path
            d="M525 132C509 165 511 204 526 231C534 247 539 273 537 289L578 283C567 220 551 154 525 132Z"
            fill={`url(#${id}-fold)`}
            opacity="0.65"
          />
          {Array.from({ length: 40 }, (_, index) => (
            <path
              key={`crown-row-${index}`}
              d={`M213 ${103 + index * 5.65}Q${364 - index * 0.5} ${168 + index * 5.5} 610 ${105 + index * 5.82}`}
              fill="none"
              stroke={index % 3 === 0 ? "#967246" : "#fff7de"}
              strokeOpacity={index % 3 === 0 ? 0.15 : 0.52}
              strokeWidth="0.7"
            />
          ))}
          <path d={crown} fill={`url(#${id}-weave)`} opacity="0.88" />
          <path
            d="M253 207C259 169 269 138 282 126"
            fill="none"
            stroke="#fff7df"
            strokeOpacity="0.48"
            strokeWidth="2"
          />
        </g>

        <path
          d={band}
          transform="translate(0 3)"
          fill="#6b4d2c"
          opacity="0.28"
        />
        <path d={band} fill={`url(#${id}-band)`} />
        <path d={band} fill={`url(#${id}-ribbon-texture)`} />
        <path
          d={
            traveler
              ? "M235 276C320 318 477 333 581 283"
              : "M236 261C320 310 482 321 577 273"
          }
          fill="none"
          stroke="#a49680"
          strokeOpacity="0.26"
          strokeWidth="1.1"
        />
        <path
          d="M229 305C296 346 476 369 586 307"
          fill="none"
          stroke="#17140f"
          strokeOpacity="0.46"
          strokeWidth="1.3"
        />

        {/* Hand-folded grosgrain bow, visible on the nearer side. */}
        <g transform={traveler ? "translate(1 9) scale(1 .965)" : undefined}>
          <path
            d="M504 305L558 289L557 315L506 328Z"
            fill={ribbon}
            stroke="#171512"
            strokeOpacity="0.65"
            strokeWidth="0.8"
          />
          <path
            d="M507 307L532 311L554 293L549 311L534 320L508 325Z"
            fill="#99816a"
            opacity="0.13"
          />
          <path
            d="M527 299L538 296L537 324L526 327Z"
            fill={ribbon}
            stroke="#141310"
            strokeOpacity="0.54"
            strokeWidth="1"
          />
          <path
            d="M530 301L529 323"
            stroke="#b09d84"
            strokeOpacity="0.35"
            strokeWidth="0.9"
          />
        </g>
        <path
          d="M226 310C264 340 340 355 414 354C491 354 558 341 588 310"
          fill="none"
          stroke="#fff0cf"
          strokeWidth="1.4"
          strokeOpacity="0.56"
        />
      </g>
    </svg>
  );
}

export function HatClassic(props: HatProps) {
  return <HatIllustration {...props} variant="classic" />;
}
export function HatWideBrim(props: HatProps) {
  return <HatIllustration {...props} variant="wide-brim" />;
}
export function HatFedora(props: HatProps) {
  return <HatIllustration {...props} variant="fedora" />;
}
export function HatTraveler(props: HatProps) {
  return <HatIllustration {...props} variant="traveler" />;
}
export function HatHero(props: HatProps) {
  return <HatIllustration {...props} variant="hero" />;
}

