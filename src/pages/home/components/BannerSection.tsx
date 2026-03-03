
import bannerTelegramImage from '../../../assets/banner-telegram.png';

export default function BannerSection() {
  return (
    <section className="bg-white py-5 md:py-8">
      <div className="px-4">
        <a
          href="https://t.me/addlist/vU9C9Dvo_TJkZThl"
          target="_blank"
          rel="noopener nofollow noreferrer"
          className="block"
        >
          <img
            src={bannerTelegramImage}
            alt="Trusted Pokies Australia Telegram Banner"
            className="w-full max-w-4xl mx-auto"
          />
        </a>
      </div>
    </section>
  );
}
