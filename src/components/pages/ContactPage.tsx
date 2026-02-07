import { Reveal } from '../ui/Reveal';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useLanguage } from '../../utils/languageContext';
import { ParallaxHero } from '../ui/ParallaxHero';

import { CONTACT_HERO_IMAGE } from '../../utils/mockDataBilingual';

export function ContactPage() {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white min-h-screen pb-24 font-sans text-black">
      {/* Hero Map - Using Fog Forrest image from JSON */}
       <ParallaxHero 
        image={CONTACT_HERO_IMAGE}
        height="h-[60vh] md:h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>

      <div className="w-full px-6 pt-24">
        
        {/* Contact Content */}
        <div className="flex flex-col md:flex-row mb-32 md:mb-40">
             {/* Left Column */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <Reveal>
                    <h1 className={`text-xl md:text-2xl font-normal sticky top-32 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
                    </h1>
                </Reveal>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 flex flex-col gap-12">
                <Reveal delay={0.1}>
                    <div className="flex flex-col gap-8">
                         <div className="flex flex-col gap-2">
                            <span className="text-sm uppercase tracking-wider text-gray-500">General Inquiries</span>
                            <a href="mailto:info@khaoyaiart.com" className="text-xl md:text-2xl font-normal hover:text-gray-600 transition-colors">
                                info@khaoyaiart.com
                            </a>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <span className="text-sm uppercase tracking-wider text-gray-500">Press Inquiries</span>
                            <a href="mailto:press@khaoyaiart.com" className="text-xl md:text-2xl font-normal hover:text-gray-600 transition-colors">
                                press@khaoyaiart.com
                            </a>
                        </div>
                        
                         <div className="flex flex-col gap-2">
                            <span className="text-sm uppercase tracking-wider text-gray-500">Social Media</span>
                            <a href="https://instagram.com/khaoyai_art_forrest" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-normal hover:text-gray-600 transition-colors">
                                @khaoyai_art_forrest
                            </a>
                        </div>
                        
                         <div className="flex flex-col gap-2">
                            <span className="text-sm uppercase tracking-wider text-gray-500">Website</span>
                            <a href="https://www.khaoyaiart.com" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-normal hover:text-gray-600 transition-colors">
                                www.khaoyaiart.com
                            </a>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className={`text-xl md:text-2xl font-normal leading-tight mt-4 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                        {language === 'th' ? 'หรือฝากข้อความด้านล่าง' : 'Or leave a message below.'}
                    </p>
                    <form className="flex flex-col gap-6 w-full max-w-lg mt-8" onSubmit={(e) => e.preventDefault()}>
                        <Input 
                            placeholder={language === 'th' ? 'อีเมล' : 'Email'}
                            className="rounded-none border-gray-300 h-12 text-lg placeholder:text-gray-400 font-sans"
                        />
                        <Textarea 
                            placeholder={language === 'th' ? 'ข้อความสอบถาม' : 'Inquiry Box'}
                            className={`rounded-none border-gray-300 min-h-[200px] text-lg placeholder:text-gray-400 resize-none font-sans ${language === 'th' ? 'leading-[1.82em]' : ''}`}
                        />
                        <Button 
                            type="submit"
                            className="rounded-none bg-[#1A1A1A] hover:bg-black text-white px-8 py-6 text-lg w-fit font-sans"
                        >
                            {language === 'th' ? 'ส่ง' : 'Submit'}
                        </Button>
                    </form>
                </Reveal>
            </div>
        </div>

      </div>
    </div>
  );
}
