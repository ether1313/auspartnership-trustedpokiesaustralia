import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../home/components/Footer';
import NotFound from '../NotFound';
import gamingCertLicenseImage from '../../assets/gaming-cert-license.png';
import { brandDetailsBySlug } from '../../mocks/brandDetails';
import { casinoData } from '../../mocks/casinos';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export default function BrandDetailPage() {
  const { slug } = useParams();
  const casino = casinoData.find((item) => item.slug === slug);
  const detail = slug ? brandDetailsBySlug[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  useEffect(() => {
    if (!casino) return;

    const title =
      detail?.heroTitle ?? `${casino.name} Casino Australia | Trusted Pokies Australia`;
    const description =
      detail?.seoDescription ??
      `${casino.name} brand page on Trusted Pokies Australia. Explore promotions, secure access, login and register links, and casino details for Australian players.`;
    const keywords =
      detail?.seoKeywords ??
      `${casino.name}, ${casino.name} login, ${casino.name} register, ${casino.name} casino, Australia online casino, trusted pokies australia`;
    const canonicalUrl = window.location.href;
    const socialImage = new URL(casino.coverImage, window.location.origin).href;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', keywords);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:site_name', 'Trusted Pokies Australia');
    upsertMeta('property', 'og:image', socialImage);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', socialImage);
    upsertCanonical(canonicalUrl);
  }, [casino, detail]);

  if (!casino) return <NotFound />;

  return (
    <div className="min-h-screen bg-white">
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-2xl border border-[#d8f2d7] p-4 md:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <img
                src={casino.logo}
                alt={`${casino.name} logo`}
                className="h-10 md:h-14 w-auto object-contain"
              />
              <div className="flex w-full md:w-auto items-center justify-center md:justify-end gap-3">
                <a
                  href={casino.loginUrl}
                  target="_blank"
                  rel="noopener nofollow noreferrer"
                  className="bg-[#51ec49] text-[#000000] border border-[#25e61a] px-5 py-2 rounded-full text-sm font-bold hover:bg-[#46c142] transition-colors"
                >
                  Login
                </a>
                <a
                  href={casino.registerUrl}
                  target="_blank"
                  rel="noopener nofollow noreferrer"
                  className="bg-gradient-to-r bg-[#227a1d] text-[#ffffff] px-5 py-2 rounded-full text-sm font-bold hover:bg-[#1da416] transition-all"
                >
                  Register
                </a>
              </div>
            </div>

            <img
              src={casino.coverImage}
              alt={`${casino.name} casino cover`}
              className="w-full rounded-xl border border-[#d8f2d7] mb-6"
            />

            <h1 className="text-2xl md:text-4xl font-bold text-[#114b5f] leading-tight mb-4">
              {detail?.heroTitle ?? `${casino.name} Casino: Trusted Online Entertainment for Australian Players`}
            </h1>
            {detail?.intro?.map((paragraph) => (
              <p key={paragraph} className="text-[#446571] leading-8 text-base md:text-lg mb-4">
                {paragraph}
              </p>
            ))}
            {!detail && (
              <p className="text-[#446571] leading-8 text-base md:text-lg mb-8">
                {casino.description}
              </p>
            )}

            {detail?.sections?.map((section) => (
              <section key={section.title} className="mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-[#114b5f] mb-3">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-[#446571] leading-8 text-base md:text-lg mb-3">
                    {paragraph}
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul className="list-disc pl-6 text-[#446571] space-y-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="leading-7 text-base md:text-lg">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {detail?.faqs?.length ? (
              <section className="mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-[#114b5f] mb-3">FAQs</h2>
                <div className="space-y-4">
                  {detail.faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="text-lg md:text-xl font-semibold text-[#114b5f] mb-1">{faq.question}</h3>
                      <p className="text-[#446571] leading-8 text-base md:text-lg">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {detail?.conclusion?.length ? (
              <section className="mb-8">
                <h2 className="text-xl md:text-3xl font-bold text-[#114b5f] mb-3">Conclusion</h2>
                {detail.conclusion.map((paragraph) => (
                  <p key={paragraph} className="text-[#446571] leading-8 text-base md:text-lg mb-3">
                    {paragraph}
                  </p>
                ))}
              </section>
            ) : null}

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                to="/"
                className="text-[#114b5f] bg-[#EBFFED] border border-[#80d07d] px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Back to Home
              </Link>
            </div>

            <img
              src={gamingCertLicenseImage}
              alt="Gaming Certification License"
              className="w-full max-w-4xl mx-auto h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
