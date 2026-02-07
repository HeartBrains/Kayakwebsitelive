import { useEffect, useRef } from 'react';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useLanguage } from '../../utils/languageContext';

export type AboutPageType = 'about' | 'vision' | 'history';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  activePage?: AboutPageType;
}

import { ABOUT_HERO_IMAGE } from '../../utils/mockDataBilingual';

export function AboutPage({ onNavigate, activePage = 'about' }: AboutPageProps) {
  const { language, t } = useLanguage();
  const isScrolling = useRef(false);

  // Handle auto-scroll to section
  useEffect(() => {
    if (activePage) {
        const el = document.getElementById(activePage);
        if (el) {
            setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    }
  }, [activePage]);

  return (
    <div className="w-full min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <ParallaxHero 
        image={ABOUT_HERO_IMAGE}
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>

      <div className="w-full px-6 pt-[96px] pr-[24px] pb-[0px] md:pl-[48px]">
        <div className="flex flex-col gap-24 md:gap-32">
        
            {/* About Us */}
            <section id="about" className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <Reveal>
                        <h2 className="text-xl md:text-2xl font-normal font-sans text-black leading-tight">
                          {language === 'th' ? 'ปรัชญา' : 'Philosophy'}
                        </h2>
                    </Reveal>
                </div>
                <div className="w-full md:w-1/2">
                    <Reveal delay={0.1}>
                        <div className="flex flex-col gap-6 text-xl md:text-2xl text-black font-normal leading-tight">
                            <h3 className="text-xl md:text-2xl font-normal text-black leading-tight">Heal the Land through Art</h3>
                            <p className={language === 'th' ? 'leading-[1.82em]' : undefined}>
                              {language === 'th' 
                                ? 'อาณาจักร 210 เอเคอร์ที่เชื่อมโยงศิลปะ นิเวศวิทยา และการศึกษาเข้าด้วยกัน'
                                : 'A 210-acre sanctuary bridging art, ecology, and education.'}
                            </p>

                        </div>
                    </Reveal>
                </div>
            </section>

             {/* Mission */}
            <section id="vision" className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <Reveal>
                        <h2 className="text-xl md:text-2xl font-normal font-sans text-black leading-tight">
                          Mission
                        </h2>
                    </Reveal>
                </div>
                <div className="w-full md:w-1/2">
                    <Reveal delay={0.1}>
                        <p className={`text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                          To showcase extraordinary works by living artists and underscore their connection to the healing power of nature.
                        </p>
                    </Reveal>
                </div>
            </section>
            
            {/* Vision */}
            <section className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <Reveal>
                        <h2 className="text-xl md:text-2xl font-normal font-sans text-black leading-tight">
                          Vision
                        </h2>
                    </Reveal>
                </div>
                <div className="w-full md:w-1/2">
                    <Reveal delay={0.1}>
                        <p className={`text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                          To create a new cultural destination that redefines the relationship between humans and the environment through learning, nurturing, and active restoration.
                        </p>
                    </Reveal>
                </div>
            </section>

             {/* Concept */}
            <section className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <Reveal>
                        <h2 className="text-xl md:text-2xl font-normal font-sans text-black leading-tight">
                          Concept
                        </h2>
                    </Reveal>
                </div>
                <div className="w-full md:w-1/2">
                    <Reveal delay={0.1}>
                        <p className={`text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                          Land Art 2.0 – fostering an approach where art quietly integrates and dissolves into the landscape rather than imposing traditional monumentality.
                        </p>
                    </Reveal>
                </div>
            </section>

        </div>
      </div>
    </div>
  );
}
