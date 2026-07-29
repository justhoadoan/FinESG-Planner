const { chromium } = require("playwright");

(async () => {
  const errors = [];
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: ["--disable-gpu", "--disable-software-rasterizer"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1800 },
    deviceScaleFactor: 1,
  });

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console:${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`page:${error.message}`));

  await page.goto(
    "file:///G:/FinESG/_bmad-output/planning-artifacts/ux-designs/ux-FinESG-2026-07-29/validation-report.html",
    { waitUntil: "load" },
  );

  const metrics = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
    details: document.querySelectorAll("details").length,
    cards: document.querySelectorAll(".dim-card").length,
    placeholders: (document.body.innerText.match(/TEMPLATE_/g) || []).length,
  }));

  await page.screenshot({
    path: "G:/FinESG/_bmad-output/planning-artifacts/ux-designs/ux-FinESG-2026-07-29/.working/validation-report.png",
    fullPage: true,
  });

  await page.locator(".reviewer-section details").evaluate((element) => {
    element.open = true;
  });
  const expanded = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
  }));
  await page.screenshot({
    path: "G:/FinESG/_bmad-output/planning-artifacts/ux-designs/ux-FinESG-2026-07-29/.working/validation-report-accessibility.png",
    fullPage: true,
  });

  await page.setViewportSize({ width: 320, height: 900 });
  await page.locator("details").evaluateAll((elements) => {
    for (const element of elements) element.open = false;
  });
  const narrow = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    height: document.documentElement.scrollHeight,
  }));
  await page.screenshot({
    path: "G:/FinESG/_bmad-output/planning-artifacts/ux-designs/ux-FinESG-2026-07-29/.working/validation-report-320.png",
    fullPage: true,
  });

  process.stdout.write(
    `${JSON.stringify({ metrics, expanded, narrow, errors })}\n`,
  );
  await browser.close();
})().catch((error) => {
  process.stderr.write(`${error.stack || error}\n`);
  process.exit(1);
});
