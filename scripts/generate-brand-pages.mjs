import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outDir = path.join(projectRoot, 'out');
const baseHtmlPath = path.join(outDir, 'index.html');

const jiti = createJiti(import.meta.url);
const { brandDetailsBySlug } = jiti(path.join(projectRoot, 'src/mocks/brandDetails.ts'));

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function setTitle(html, title) {
  const titleTag = `<title>${escapeHtml(title)}</title>`;
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, titleTag);
  }
  return html.replace('</head>', `  ${titleTag}\n</head>`);
}

function upsertMeta(html, attr, key, content) {
  const escaped = escapeHtml(content);
  const regex = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*\\/?>`, 'i');
  const tag = `<meta ${attr}="${key}" content="${escaped}" />`;
  if (regex.test(html)) {
    return html.replace(regex, tag);
  }
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function upsertCanonical(html, href) {
  const escaped = escapeHtml(href);
  const regex = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;
  const tag = `<link rel="canonical" href="${escaped}" />`;
  if (regex.test(html)) {
    return html.replace(regex, tag);
  }
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function buildCoreContent(slug, detail) {
  const intro = (detail.intro ?? []).slice(0, 2);
  const sectionParagraphs = (detail.sections ?? [])
    .flatMap((section) => section.paragraphs ?? [])
    .slice(0, 2);
  const paragraphs = [...intro, ...sectionParagraphs].slice(0, 3);

  const body = paragraphs
    .map((paragraph) => `      <p>${escapeHtml(paragraph)}</p>`)
    .join('\n');

  return `<noscript id="brand-seo-content">
    <article data-brand-slug="${escapeHtml(slug)}">
      <h1>${escapeHtml(detail.heroTitle)}</h1>
${body}
    </article>
  </noscript>`;
}

async function main() {
  const baseHtml = await readFile(baseHtmlPath, 'utf8');

  for (const [slug, detail] of Object.entries(brandDetailsBySlug)) {
    const brandUrl = `https://www.auspartnership.net/brands/${slug}`;
    let html = baseHtml;

    html = setTitle(html, detail.heroTitle);
    html = upsertMeta(html, 'name', 'description', detail.seoDescription);
    html = upsertMeta(html, 'name', 'keywords', detail.seoKeywords);
    html = upsertMeta(html, 'property', 'og:title', detail.heroTitle);
    html = upsertMeta(html, 'property', 'og:description', detail.seoDescription);
    html = upsertMeta(html, 'property', 'og:url', brandUrl);
    html = upsertMeta(html, 'name', 'twitter:title', detail.heroTitle);
    html = upsertMeta(html, 'name', 'twitter:description', detail.seoDescription);
    html = upsertCanonical(html, brandUrl);

    const noscriptContent = buildCoreContent(slug, detail);
    if (html.includes('<noscript id="brand-seo-content">')) {
      html = html.replace(
        /<noscript id="brand-seo-content">[\s\S]*?<\/noscript>/i,
        noscriptContent
      );
    } else {
      html = html.replace('<div id="root"></div>', `${noscriptContent}\n    <div id="root"></div>`);
    }

    const brandOutDir = path.join(outDir, 'brands', slug);
    await mkdir(brandOutDir, { recursive: true });
    await writeFile(path.join(brandOutDir, 'index.html'), html, 'utf8');
  }
}

main().catch((error) => {
  console.error('Failed to generate brand pages:', error);
  process.exit(1);
});
