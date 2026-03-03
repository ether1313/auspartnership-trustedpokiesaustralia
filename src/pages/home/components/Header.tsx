
import tpaPartnershipLogo from '../../../assets/tpapartnership.png';

export default function Header() {
  return (
    <header className="bg-[#EBFFED] py-4 md:py-6 shadow-sm border-b border-[#c1ffc7]">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <img 
            src={tpaPartnershipLogo}
            alt="Trusted Pokies Australia Partnership Company Cooperation"
            className="h-14 md:h-24 w-auto drop-shadow-lg"
          />
        </div>
      </div>
    </header>
  );
}
