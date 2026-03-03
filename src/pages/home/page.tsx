
import Header from './components/Header';
import MarqueeBar from './components/MarqueeBar';
import BannerSection from './components/BannerSection';
import CasinoGrid from './components/CasinoGrid';
import ContentSection from './components/ContentSection';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <MarqueeBar />
      <BannerSection />
      <CasinoGrid />
      <ContentSection />
      <Footer />
    </div>
  );
}
