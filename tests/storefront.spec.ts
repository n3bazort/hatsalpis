import { expect, test, type Page } from "@playwright/test";

const productNames = [
  "Classic Montecristi",
  "Wide Brim",
  "Fedora Natural",
  "Traveler Hat",
];

async function openSite(page: Page) {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
}

async function scrollCarousel(page: Page, progress: number) {
  await page.locator(".carousel-section").evaluate((section, value) => {
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (section.clientHeight - window.innerHeight) * value,
      behavior: "instant",
    });
  }, progress);
}

async function hatState(page: Page, index: number) {
  return page
    .locator(".carousel-hat")
    .nth(index)
    .evaluate((hat) => {
      const transform = new DOMMatrix(getComputedStyle(hat).transform);
      return {
        x: transform.m41,
        scale: Math.hypot(transform.m11, transform.m12),
      };
    });
}

test("brand, assets, and layout work without horizontal overflow", async ({
  page,
}) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await openSite(page);
  await expect(
    page.getByRole("link", { name: "Hats & Handicrafts, inicio", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "HATS & HANDICRAFTS", exact: true }),
  ).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    "MONTECRISTI HATS",
  );
  await expect(page.locator(".product-card")).toHaveCount(4);
  // Check every full-screen section, including the intentionally clipped orbital carousel.
  for (const section of [
    "#inicio",
    "#artesania",
    "#coleccion",
    ".brand-panel",
    "#siluetas",
    "#contacto",
  ]) {
    await page.locator(section).scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        ),
      )
      .toBeLessThanOrEqual(1);
  }
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((images) =>
          images.every((image) => image.complete && image.naturalWidth > 0),
        ),
    )
    .toBe(true);
  for (const selector of [".editorial-strip", ".collection-grid"]) {
    const content = page.locator(selector);
    await content.evaluate((element) =>
      element.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    await expect
      .poll(() =>
        content.evaluate((element) => Number(getComputedStyle(element).opacity)),
      )
      .toBeGreaterThanOrEqual(0.99);
  }
  expect(runtimeErrors).toEqual([]);
});

test("menu traps focus, closes with Escape, and navigates to the collection", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openSite(page);
  const trigger = page.getByRole("button", { name: "Abrir navegación" });
  await trigger.click();
  const menu = page.getByRole("dialog", { name: "Navegación principal" });
  await expect(menu).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    menu.getByRole("button", { name: "Cerrar navegación" }),
  ).toBeFocused();
  for (let index = 0; index < 6; index++) {
    await page.keyboard.press("Tab");
    // Native dialogs allow tabbing to browser chrome, represented by body;
    // the page behind the modal must remain unavailable to keyboard focus.
    expect(
      await menu.evaluate(
        (dialog) =>
          document.activeElement === document.body ||
          dialog.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await trigger.evaluate((button) => button.focus());
  await expect(trigger).not.toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await menu.getByRole("link", { name: "03 Los sombreros" }).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#coleccion$/);
  await expect(
    page.getByRole("heading", { name: "Nuestros sombreros." }),
  ).toBeInViewport();
});

test("each product opens with a reset size and a correct WhatsApp enquiry", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openSite(page);
  for (const name of productNames) {
    const card = page.getByRole("button", { name: `Ver ${name}`, exact: true });
    await card.click();
    const dialog = page.getByRole("dialog", { name, exact: true });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("radio", { name: "Por definir", exact: true }),
    ).toBeChecked();
    await dialog.getByRole("radio", { name: "M · 56–57", exact: true }).check();
    await expect(
      dialog.getByRole("radio", { name: "M · 56–57", exact: true }),
    ).toBeChecked();
    const contact = dialog.getByRole("link", { name: "Consultar esta pieza" });
    const destination = new URL((await contact.getAttribute("href"))!);
    expect(destination.origin).toBe("https://wa.me");
    expect(destination.pathname).toBe("/593967113954");
    expect(destination.searchParams.get("text")).toContain(name);
    expect(destination.searchParams.get("text")).toContain("M · 56–57");
    await expect(contact).toHaveAttribute("target", "_blank");
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(card).toBeFocused();
  }
});

test("materials and care content open and close accessibly", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openSite(page);
  const materials = page.getByRole("button", { name: "Conoce nuestra fibra" });
  await materials.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveAccessibleName("Una fibra. Mil historias.");
  await expect(dialog).toContainText("paja toquilla");
  await dialog.getByRole("button", { name: "Cerrar información" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(materials).toBeFocused();
  const care = page.getByRole("button", { name: "03 Cuidado" });
  await care.click();
  await expect(dialog).toHaveAccessibleName("Una pieza para cuidar.");
  await expect(dialog).toContainText("Tómalo por el ala");
  await expect(dialog).toContainText("No lo enrolles ni lo dobles");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(care).toBeFocused();
});

test("scroll carousel changes the central hat from start through end", async ({
  page,
}) => {
  await openSite(page);
  const controls = page.locator(".carousel-controls");
  await scrollCarousel(page, 0);
  await expect(controls.getByRole("heading")).toHaveText("Classic Montecristi");
  await expect(
    controls.getByRole("button", { name: "Sombrero anterior" }),
  ).toBeDisabled();
  const start = await hatState(page, 2);
  expect(start.scale).toBeCloseTo(1.18, 2);
  expect(start.scale).toBeGreaterThan((await hatState(page, 1)).scale);

  await scrollCarousel(page, 0.5);
  await expect(controls.getByRole("heading")).toHaveText("Fedora Natural");
  expect((await hatState(page, 4)).scale).toBeCloseTo(1.18, 2);
  expect((await hatState(page, 2)).x).toBeLessThan(start.x);
  await expect(
    controls.getByRole("button", { name: "Ver silueta 3: Fedora Natural" }),
  ).toHaveAttribute("aria-current", "true");

  await scrollCarousel(page, 1);
  await expect(controls.getByRole("heading")).toHaveText(
    "El arte de lo natural",
  );
  expect((await hatState(page, 6)).scale).toBeCloseTo(1.18, 2);
  await expect(
    controls.getByRole("button", { name: "Siguiente sombrero" }),
  ).toBeDisabled();
  await controls.getByRole("button", { name: "Sombrero anterior" }).click();
  await expect(controls.getByRole("heading")).toHaveText("Traveler Hat");
  await controls.getByRole("button", { name: "Siguiente sombrero" }).click();
  await expect(controls.getByRole("heading")).toHaveText(
    "El arte de lo natural",
  );
});

test("reduced motion preserves usable carousel and contact controls", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openSite(page);
  await scrollCarousel(page, 0);
  await page
    .getByRole("button", { name: "Ver silueta 4: Traveler Hat" })
    .click();
  await expect(page.locator(".carousel-controls h3")).toHaveText(
    "Traveler Hat",
  );
  await expect
    .poll(async () => (await hatState(page, 5)).scale)
    .toBeCloseTo(1.18, 2);
  const rotation = await page
    .locator(".carousel-hat")
    .nth(4)
    .evaluate((hat) => new DOMMatrix(getComputedStyle(hat).transform).m12);
  expect(rotation).toBe(0);
  const contact = page
    .getByRole("link", { name: "Conversemos por WhatsApp", exact: true })
    .last();
  await contact.scrollIntoViewIfNeeded();
  await expect(contact).toBeInViewport();
  await expect(contact).toHaveAttribute(
    "href",
    /^https:\/\/wa\.me\/593967113954\?text=/,
  );
  await expect(
    page.getByRole("link", { name: "096 711 3954" }),
  ).toHaveAttribute("href", "tel:+593967113954");
  if (isMobile) {
    // Regression: short phones must not crop the carousel buttons below the fold.
    await page.setViewportSize({ width: 320, height: 568 });
    await page.reload();
    await page.evaluate(() => document.fonts.ready);
    await scrollCarousel(page, 0.5);
    await expect(page.locator(".carousel-controls h3")).toHaveText(
      "Fedora Natural",
    );
    for (const name of ["Sombrero anterior", "Siguiente sombrero"]) {
      const control = page.getByRole("button", { name, exact: true });
      await expect(control).toBeInViewport({ ratio: 1 });
    }
  }
});
