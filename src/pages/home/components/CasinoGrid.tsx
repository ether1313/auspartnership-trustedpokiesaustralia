
import { casinoData } from '../../../mocks/casinos';
import CasinoCard from './CasinoCard';

export default function CasinoGrid() {
  return (
    <section className="py-6 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-[#0a2e1f] mb-6 md:mb-8 tracking-wide uppercase">
          <span className="border-b-4 border-[#2f9c53] pb-1">Official Affiliate Partners</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 items-start gap-3 md:gap-6 max-w-4xl mx-auto">
          {casinoData.map((casino) => (
            <CasinoCard key={casino.id} casino={casino} />
          ))}
        </div>
      </div>
    </section>
  );
}
