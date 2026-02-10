import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

interface HeaderProps {
  onMenuClick: () => void;
  onLogoClick?: () => void;
  isTransparent?: boolean;
}

export function Header({ onMenuClick, onLogoClick, isTransparent = false }: HeaderProps) {
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center transition-colors duration-300 ${
        isTransparent ? 'bg-transparent text-white' : 'bg-transparent text-black'
      }`}
    >
      {/* Gradient Overlay for Desktop */}
      <div 
        className={`absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/50 to-transparent -z-10 pointer-events-none transition-opacity duration-300 ${
          isTransparent ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <div 
        onClick={onLogoClick}
        className="text-3xl md:text-[2.4vw] font-bold font-sans cursor-pointer mt-0 mr-0 mb-0 ml-0 md:ml-[24px] p-0 overflow-visible"
      >
        Khao Yai
        <br />
        Art Forest
      </div>
      <Button 
        variant="ghost" 
        onClick={onMenuClick}
        className={`w-[9vw] h-[9vw] min-w-[9vw] min-h-[9vw] md:w-[6vw] md:h-[6vw] md:min-w-[6vw] md:min-h-[6vw] !p-0 transition-colors ${
          isTransparent 
            ? 'text-white hover:bg-white/20 hover:text-white' 
            : 'text-black hover:bg-black/10 hover:text-black'
        }`}
      >
        <Menu className="!w-[82%] !h-[82%] md:!w-[45%] md:!h-[45%]" strokeWidth={1.5} />
      </Button>
    </header>
  );
}
