import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const outDir = path.join(projectRoot, 'out');
const siteUrl = 'https://www.auspartnership.net';

function toIsoDate(date = new Date()) {
  return date.toISOString().split('T')[0];
}

async function extractSlugs() {
  const casinosPath = path.join(projectRoot, 'src/mocks/casinos.ts');
  const source = await readFile(casinosPath, 'utf8');
  return [...source.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
}

function buildSitemap(urls) {
  const lines = urls
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${lines}
</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

async function main() {
  await readFile(path.join(outDir, 'index.html'), 'utf8');

  const today = toIsoDate();
  const slugs = await extractSlugs();
  const brandUrls = slugs.map((slug) => ({
    loc: `${siteUrl}/brands/${slug}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.90',
  }));

  const urls = [
    {
      loc: `${siteUrl}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: '1.00',
    },
    ...brandUrls,
  ];

  const sitemapXml = buildSitemap(urls);
  const robotsTxt = buildRobots();

  await writeFile(path.join(outDir, 'sitemap.xml'), sitemapXml, 'utf8');
  await writeFile(path.join(outDir, 'robots.txt'), robotsTxt, 'utf8');
}

main().catch((error) => {
  console.error('Failed to generate sitemap/robots:', error);
  process.exit(1);
});
