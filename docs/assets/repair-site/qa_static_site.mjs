import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const pages = ["index.html", "about.html", "services.html", "cases.html", "notes.html", "contact.html"];
const htmlFiles = new Set(pages);

for (const page of pages) {
  const source = await readFile(resolve(root, page), "utf8");
  assert.match(source, /<html lang="ja">/i, `${page}: lang`);
  assert.match(source, /name="viewport"/, `${page}: viewport`);
  assert.match(source, /<main id="main">/, `${page}: main landmark`);
  assert.match(source, /rel="stylesheet" href="styles\.css"/, `${page}: stylesheet`);
  assert.match(source, /rel="icon" href="favicon\.svg"/, `${page}: favicon`);
  assert.match(source, /<script src="script\.js"><\/script>/, `${page}: script`);
  assert.match(source, /aria-label="メインナビゲーション"/, `${page}: nav label`);
  assert.match(source, /道具の修理受付/, `${page}: site identity`);
  assert.match(source, /自主制作 \/ 静的Webサンプル/, `${page}: self-initiated boundary in site identity`);
  assert.doesNotMatch(source, /class="eyebrow"|class="topline"/, `${page}: no repeated decorative kickers`);
  assert.doesNotMatch(source, /button--accent" href="contact\.html"/, `${page}: no default nav CTA fingerprint`);
  assert.doesNotMatch(source, /<form\b/i, `${page}: no submit-capable form`);

  for (const [, href] of source.matchAll(/href="([^"]+)"/g)) {
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) continue;
    const target = href.split("#")[0];
    if (htmlFiles.has(target)) await access(resolve(root, target));
  }
}

const index = await readFile(resolve(root, "index.html"), "utf8");
assert.match(index, /<h1 class="home-title"><span>家具・生活道具<\/span><span>の修理相談<\/span><\/h1>/, "meaningful home heading lines");
assert.match(index, /class="hero-summary"/, "practical hero summary");
assert.match(index, /<dt>写真<\/dt>[\s\S]*<dt>状態<\/dt>[\s\S]*<dt>サイズ<\/dt>/, "specific consultation inputs");
assert.match(index, /class="item-list"/, "consultation items use a ruled list");
assert.doesNotMatch(index, /class="hero-art"|class="grid-3"/, "no abstract hero art or equal feature cards");

const contact = await readFile(resolve(root, "contact.html"), "utf8");
assert.match(contact, /role="group" aria-label="修理相談入力の表示サンプル"/, "static input group label");
assert.match(contact, /type="file"/, "file input sample");
assert.match(contact, /送信・保存されません/, "no submission disclosure");
assert.doesNotMatch(contact, /type="submit"/, "no submit button");

const cases = await readFile(resolve(root, "cases.html"), "utf8");
assert.match(cases, /ページ構成と表示を確認するための架空例/, "fictional case boundary");
assert.doesNotMatch(cases, /\d+%|\d+件|導入実績|実績値/, "no invented results");

const css = await readFile(resolve(root, "styles.css"), "utf8");
assert.match(css, /@media \(max-width: 760px\)/, "responsive breakpoint");
assert.match(css, /prefers-reduced-motion/, "reduced motion");
assert.match(css, /:focus-visible/, "keyboard focus");
assert.match(css, /grid-template-columns: 1fr/, "mobile single column");
assert.doesNotMatch(css, /Inter|#c96845|#8e3e2b|\.eyebrow|\.hero-art|\.grid-3/, "no default cozy palette, Inter, kickers, abstract hero, or feature grid");
assert.match(css, /font-family: "Hiragino Sans", "Yu Gothic", "Meiryo"/, "intentional Japanese local font stack");
assert.match(css, /\.menu-button \{[^}]*min-height: 2\.75rem/s, "menu tap height");
assert.match(css, /\.footer-links a \{[^}]*min-height: 2\.75rem/s, "footer link tap height");
assert.match(css, /\.link-arrow \{[^}]*min-height: 2\.75rem/s, "case link tap height");
assert.match(css, /\.field input, \.field textarea, \.field select \{[^}]*min-height: 2\.75rem/s, "input tap height");

const js = await readFile(resolve(root, "script.js"), "utf8");
assert.match(js, /aria-expanded/, "menu state");
assert.match(js, /event\.key === ['"]Escape['"][\s\S]*restoreFocus: true/, "Escape closes menu and restores focus");
assert.match(js, /data-year/, "dynamic year");
assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|localStorage|sessionStorage/, "no external submission or storage");
await access(resolve(root, "favicon.svg"));

console.log(`Repair intake static site QA passed: ${pages.length} pages, site identity and internal links verified, no submission or storage code.`);
