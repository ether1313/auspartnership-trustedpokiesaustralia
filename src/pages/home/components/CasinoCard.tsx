
import { Link } from 'react-router-dom';

interface Casino {
  id: number;
  name: string;
  logo: string;
  registerUrl: string;
  infoUrl: string;
  description: string;
}

interface CasinoCardProps {
  casino: Casino;
}

export default function CasinoCard({ casino }: CasinoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#d7eef2] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="bg-[#EBFFED] p-3 md:p-4 flex justify-center items-center h-[95px] md:h-[150px]">
        <Link to={casino.infoUrl} className="block">
          <img 
            src={casino.logo} 
            alt={casino.name} 
            className="max-h-16 md:max-h-24 w-auto object-contain animate-bounce-scale drop-shadow-lg"
          />
        </Link>
      </div>
      
      <div className="p-3 md:p-4 bg-white h-[72px] md:h-[250px] flex flex-col">
        <div className="flex justify-center mb-0 md:mb-3 flex-shrink-0">
          <a 
            href={casino.registerUrl} 
            target="_blank" 
            rel="noopener nofollow noreferrer"
            className="bg-gradient-to-r from-[#1db954] to-[#0f9e44] text-white px-4 md:px-7 py-2 rounded-full font-bold text-xs md:text-sm hover:from-[#17a348] hover:to-[#0a8a38] transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer tracking-wide"
          >
            ✦ Register Now
          </a>
        </div>
        
        <div className="hidden md:block text-gray-600 text-sm leading-relaxed overflow-y-auto pr-1">
          <p>{casino.description}</p>
        </div>
      </div>
    </div>
  );
}
