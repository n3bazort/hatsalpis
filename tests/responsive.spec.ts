import { test, expect } from '@playwright/test';

// Test the visible product, not just document overflow: overflow:hidden can
// conceal a clipped hero while document-width assertions still pass.
const sizes = [[320,568],[390,844],[768,1024],[1024,600],[1366,600],[1440,900],[1920,1080],[844,390]];
for (const [width,height] of sizes) {
  test(`hero fits ${width}x${height} after entrance and idle motion`, async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop', 'Viewport matrix runs once');
    await page.setViewportSize({width,height});
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(3000);
    for (let sample=0; sample<3; sample++) {
      const layout = await page.evaluate(() => {
        const box=(s:string)=>document.querySelector(s)!.getBoundingClientRect();
        const hat=box('.hero-hat-svg'), hero=box('.hero'), header=box('.site-header');
        const title=box('.hero-copy'), bottom=box('.hero-bottom');
        return {hat:{left:hat.left,right:hat.right,top:hat.top,bottom:hat.bottom},
          heroBottom:hero.bottom,headerBottom:header.bottom,titleTop:title.top,
          bottomTop:bottom.top,bottomBottom:bottom.bottom,overflow:document.documentElement.scrollWidth-innerWidth};
      });
      expect(layout.overflow).toBeLessThanOrEqual(1);
      expect(layout.titleTop).toBeGreaterThan(layout.headerBottom);
      expect(layout.hat.left).toBeGreaterThanOrEqual(0);
      expect(layout.hat.right).toBeLessThanOrEqual(width);
      expect(layout.hat.top).toBeGreaterThan(layout.headerBottom);
      expect(layout.hat.bottom).toBeLessThan(layout.bottomTop);
      expect(layout.bottomBottom).toBeLessThanOrEqual(layout.heroBottom);
      if(height>=540) expect(layout.heroBottom).toBeLessThanOrEqual(height+1);
      await page.waitForTimeout(900);
    }
  });
}
