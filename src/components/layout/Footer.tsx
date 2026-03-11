import { Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../../utils/languageContext';

export function Footer({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const { language } = useLanguage();
  
  return (
    <footer className="w-full bg-black text-white md:px-12 border-t border-white/10 p-[48px] pl-[24px] sm:p-[24px]">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0">
        
        {/* Left: Logo */}
        <div className="flex flex-col">
          <h1 className="md:text-[2.4vw] font-bold font-sans leading-none text-[24px]">
            Khao Yai
          </h1>
          <h1 className="text-3xl md:text-[2.4vw] font-bold font-sans leading-none">
            Art Forest
          </h1>
        </div>

        {/* Right: Navigation & Socials */}
        <div className="w-full lg:w-1/2 md:w-2/3  flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0">
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-sm md:text-base font-normal tracking-wide">
            <button 
              onClick={() => onNavigate?.('support')} 
              className={`hover:text-gray-300 transition-colors text-left ${language === 'th' ? 'leading-[1.82em]' : ''}`}
            >
              {language === 'th' ? 'การสนับสนุน' : 'Sponsorship'}
            </button>
            <button 
              onClick={() => onNavigate?.('contact')} 
              className={`hover:text-gray-300 transition-colors text-left ${language === 'th' ? 'leading-[1.82em]' : ''}`}
            >
              {language === 'th' ? 'สมัครรับข่าวสาร' : 'Subscription'}
            </button>
          </div>

          <div className="flex-1 flex justify-start md:justify-around items-center gap-6 w-[80%] sm:w-[40%] px-0 md:px-[29px] py-[0px]">
            <a href="https://www.facebook.com/profile.php?id=61569868164323" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/khaoyai_art_forest/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">
            ©2026 Khao Yai Art Forest
          </span>
        </div>

      </div>
    </footer>
  );
}