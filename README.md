# Hats & Handicrafts

Landing editorial para sombreros artesanales de Montecristi, Ecuador. Construida con React, TypeScript, Vite y GSAP ScrollTrigger.

## Desarrollo

Requiere Node.js 22 o superior y npm. En el entorno preparado se ha utilizado Node.js 24.

```bash
cd /workspace/hatsalpis
npm ci
npm run dev -- --port 5173
```

```bash
npm run build       # TypeScript y compilación para producción en dist/
npm run preview     # Servir la compilación localmente
npm run test:e2e    # Pruebas funcionales de escritorio y móvil
```

Las pruebas usan Chromium del sistema en `/usr/bin/chromium`. Si esa ruta no existe, instala el navegador de Playwright con `npx playwright install chromium` y elimina `executablePath` de `playwright.config.ts` para usarlo.

## Contenido y personalización

- `src/data/products.ts`: modelos, nombres, textos, colores y teléfono de WhatsApp.
- `src/components/ProductVisual.tsx`: sombreros SVG originales y reemplazo por fotografía con `type="image"` y `src`.
- `src/components/HatMark.tsx`: interpretación vectorial de la silueta de marca proporcionada.
- `public/images/`: ilustraciones editoriales SVG originales. Sustituibles por fotografías reales de la marca.
- `src/sections/`: las seis escenas de la página, separadas por componente.
- `src/hooks/useScrollScenes.ts`: animaciones, sincronización por scroll y controles del carrusel.
- `src/styles.css`: paleta, tipografía, composición y adaptación a pantallas pequeñas.

La identidad utilizada es **Hats & Handicrafts — Montecristi, Ecuador**, según las imágenes de la marca. La paleta de marca usa marfil `#f6f3ec`, ocre `#9b6f3e`, cacao `#4d2819` y marrón `#875832`. El contacto es **096 711 3954**, con formato internacional `+593967113954` para WhatsApp, y el dominio proporcionado es `hatsfalpis.com`.

Las imágenes de los sombreros, escenas de artesanía y empaque son ilustraciones reemplazables; no representan un inventario o un empaque confirmado. Los modelos proceden del guion facilitado. Las consultas de precio, disponibilidad y talla se realizan por WhatsApp. No hay cobros ni órdenes automáticas.

## Comportamiento

Seis escenas conectadas: portada con sombrero flotante, galería del oficio, colección con fichas, panel de marca, carrusel controlado por scroll y cierre de contacto. El carrusel también admite botones. Los diálogos utilizan las funciones nativas del navegador para el foco y la tecla Escape. El sombrero del héroe flota suavemente incluso sin hacer scroll; ese vaivén se pausa fuera de pantalla y se desactiva con `prefers-reduced-motion`.

Las fuentes Cormorant Garamond y DM Sans se sirven desde el propio proyecto; sus licencias están en `public/licenses/`. No se necesitan claves, cuentas externas, base de datos ni servicios adicionales para ejecutar la web.

## Publicación

`npm run build` genera un sitio estático en `dist/`. Ese directorio puede publicarse en un alojamiento estático. Los enlaces a WhatsApp y al dominio son externos; ejecutar o compilar el proyecto no publica la web ni modifica ese dominio.

## GitHub Pages

El sitio usa rutas relativas y puede publicarse en `https://n3bazort.github.io/hatsalpis/`.

La rama `main` contiene el código. La rama `gh-pages` contiene únicamente la web compilada. El workflow **Publish website** actualiza esa rama cuando cambias `main`.

En GitHub, selecciona **Settings → Pages → Deploy from a branch → gh-pages → / (root)** y guarda. Esto activa la publicación; subir el código por sí solo no confirma que Pages ya esté activo. La generación puede tardar unos minutos.
