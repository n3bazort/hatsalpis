import { expect, test, type Page } from "@playwright/test";

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
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).fontFamily)).toContain("Poppins");
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.querySelector("h1")!).fontFamily)).toContain("Poppins");
  await expect(page.locator(".hero-hat-svg")).toHaveCount(1);
  await expect(page.locator(".hero-product img")).toHaveCount(0);
  // Check every full-screen section, including the intentionally clipped orbital carousel.
  for (const section of [
    "#inicio",
    "#origen",
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
  for (let index = 0; index < 5; index++) {
    await page.getByRole("button", { name: `Ver etapa ${index + 1} del oficio` }).click();
    await expect(page.locator(".editorial-card").nth(index)).toHaveAttribute("aria-hidden", "false");
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
        content.evaluate((element) =>
          Number(getComputedStyle(element).opacity),
        ),
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
    page.getByRole("heading", { name: "Sombreros de aquí." }),
  ).toBeInViewport();
});

test("four photographic reference models open with sizes, licenses and correct enquiries", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openSite(page);
  await expect(page.locator(".product-card")).toHaveCount(4);
  const editorialSources = await page.locator(".editorial-card img, .story-frame img").evaluateAll(images => images.map(image => image.getAttribute("src")));
  for (const name of ["Fedora Natural", "Ala Ancha", "Copa Redonda", "Habano"]) {
    const card = page.getByRole("button", { name: `Ver ${name}`, exact: true });
    expect(editorialSources).not.toContain(await card.locator("img").getAttribute("src"));
    await expect(card.locator(".product-art")).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await card.click();
    const dialog = page.getByRole("dialog", { name, exact: true });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("radio", { name: "Por definir", exact: true })).toBeChecked();
    await expect(dialog.locator(".visual-note")).toHaveCount(0);
    await dialog.getByRole("radio", { name: "M · 56–57", exact: true }).check();
    const destination = new URL((await dialog.getByRole("link", { name: "Consultar esta pieza" }).getAttribute("href"))!);
    expect(destination.origin).toBe("https://wa.me");
    expect(destination.pathname).toBe("/593967113954");
    expect(destination.searchParams.get("text")).toContain(name);
    expect(destination.searchParams.get("text")).toContain("M · 56–57");
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

test("scroll presentation crossfades and navigates through distinct stories", async ({ page }) => {
  await openSite(page);
  const frames = page.locator(".story-frame");
  const controls = page.locator(".story-controls");
  await expect(frames).toHaveCount(3);
  await scrollCarousel(page, 0);
  await expect(frames.nth(0)).toHaveAttribute("aria-hidden", "false");
  await expect(controls.getByRole("button", { name: "Imagen anterior", exact: true })).toBeDisabled();
  await scrollCarousel(page, 0.25);
  await expect.poll(() => frames.nth(0).evaluate(el => Number(getComputedStyle(el).opacity))).toBeGreaterThan(0.25);
  await expect.poll(() => frames.nth(1).evaluate(el => Number(getComputedStyle(el).opacity))).toBeGreaterThan(0.25);
  await scrollCarousel(page, 1);
  await expect(frames.nth(2)).toHaveAttribute("aria-hidden", "false");
  await expect(controls.getByRole("button", { name: "Siguiente imagen", exact: true })).toBeDisabled();
  await controls.getByRole("button", { name: "Imagen anterior", exact: true }).click();
  await expect(frames.nth(1)).toHaveAttribute("aria-hidden", "false");
  await expect(frames.nth(1).locator("a")).toBeVisible();
});

test("reduced motion and short phones keep story and contact controls usable", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  if (isMobile) await page.setViewportSize({ width: 320, height: 568 });
  await openSite(page);
  await scrollCarousel(page, 0);
  await page.getByRole("button", { name: "Ver historia 3: Ninguno es igual a otro." }).click();
  const frame = page.locator(".story-frame").nth(2);
  await expect(frame).toHaveAttribute("aria-hidden", "false");
  await expect(frame).toHaveCSS("filter", "none");
  await expect(frame.locator("img")).toHaveCSS("animation-name", "none");
  for (const name of ["Imagen anterior", "Siguiente imagen"]) {
    await expect(page.getByRole("button", { name, exact: true })).toBeInViewport({ ratio: 1 });
  }
  const contact = page.getByRole("link", { name: "Conversemos por WhatsApp", exact: true }).last();
  await contact.scrollIntoViewIfNeeded();
  await expect(contact).toBeInViewport();
  await expect(contact).toHaveAttribute("href", /^https:\/\/wa\.me\/593967113954\?text=/);
  await expect(page.getByRole("link", { name: "096 711 3954" })).toHaveAttribute("href", "tel:+593967113954");
});

test("craft gallery makes every card reachable by touch and mobile controls", async ({
  page,
  isMobile,
}) => {
  await openSite(page);
  const gallery = page.getByRole("region", { name: "Galería de El oficio" });
  const cards = gallery.locator(".editorial-card");
  const next = page.getByRole("button", {
    name: "Siguiente imagen del oficio",
  });
  await expect(cards).toHaveCount(5);
  await gallery.evaluate((el) =>
    el.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  await expect(cards.first()).toBeInViewport({ ratio: 0.99 });
  await expect(page.locator(".editorial-counter")).toHaveText("01 / 05");

  if (isMobile) {
  // Real touch gestures switch the crossfade presentation.
  const touch = await page.context().newCDPSession(page);
  const box = (await gallery.boundingBox())!;
  const startX = box.x + box.width * 0.82;
  const endX = box.x + box.width * 0.18;
  const y = box.y + box.height / 2;
  await touch.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: startX, y }],
  });
  for (let step = 1; step <= 12; step++) {
    await touch.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: startX + ((endX - startX) * step) / 12, y }],
    });
    await page.waitForTimeout(20);
  }
  await touch.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect(page.locator(".editorial-counter")).toHaveText("02 / 05");
  await touch.detach();
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await gallery.focus();
  await page.keyboard.press("Home");
  await expect(page.locator(".editorial-counter")).toHaveText("01 / 05");
  for (let index = 1; index < 5; index++) {
    await next.click();
    await expect(page.locator(".editorial-counter")).toHaveText(
      `0${index + 1} / 05`,
    );
    await expect(cards.nth(index)).toHaveAttribute("aria-hidden", "false");
    await expect(cards.nth(index)).toBeVisible();
    await expect.poll(() => cards.nth(index).locator("img").evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await expect(next).toBeDisabled();
  await expect(cards.last()).toContainText("UNA PIEZA CON HISTORIA");
  await gallery.focus();
  await page.keyboard.press("Home");
  await expect(cards.first()).toBeInViewport({ ratio: 0.99 });
  await expect(
    page.getByRole("button", { name: "Imagen anterior del oficio" }),
  ).toBeDisabled();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    ),
  ).toBeLessThanOrEqual(1);
});
