import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useLanguage } from '../../utils/languageContext';
import { getTranslation } from '../../utils/translations';
import { FOUNDER, DIRECTORS, TEAM_GROUPS } from '../../utils/teamDataBilingual';
import stefanoImage from "figma:asset/53a86972f0147a364bd78a4ba6e4e6c9bfcf4267.png";
import { TEAM_HERO_IMAGE } from '../../utils/mockDataBilingual';
import heroImage from "figma:asset/206bfbf36c5300541efa9f2ed27225a361bd0d87.png";

type Section = 'founder' | 'team' | string;

interface TeamPageProps {
    activePage?: 'founder' | 'team';
    onNavigate?: (page: string) => void;
}

export function TeamPage({ activePage = 'founder' }: TeamPageProps) {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('founder');
  
  const getSectionId = (name: string) => name.replace(/\s+/g, '-').toLowerCase();

  const scrollToSection = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
          const offset = 120;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
      
          window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
          });
      }
  };

  // Scroll Spy
  useEffect(() => {
      const handleScroll = () => {
          const sectionIds = [
              'founder', 
              ...DIRECTORS.map(d => getSectionId(d.name)), 
              'team',
              ...TEAM_GROUPS.map(g => getSectionId(g.role))
          ];
          // Trigger point: 30% down the screen or fixed offset
          const headerOffset = window.innerHeight * 0.3; 
          
          let current = sectionIds[0];
          
          for (const id of sectionIds) {
              const el = document.getElementById(id);
              if (el) {
                  const rect = el.getBoundingClientRect();
                  // If the top of the section is above the threshold, it's a candidate
                  if (rect.top <= headerOffset) {
                      current = id;
                  }
              }
          }

          // Special check: if we are at the bottom of the page, activate the last section
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
              // Try to find the last visible team group
              const lastGroup = TEAM_GROUPS[TEAM_GROUPS.length - 1];
              if (lastGroup) current = getSectionId(lastGroup.role);
          }
          
          setActiveSection(current);
      };
      
      window.addEventListener('scroll', handleScroll);
      // Run once on mount to set initial state correctly
      handleScroll();
      
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial Scroll
  useEffect(() => {
    if (activePage) {
        // If it's founder, we might be at top anyway, but scroll just in case
        const target = activePage === 'team' ? 'team' : 'founder';
        
        // Use a small timeout to ensure DOM is ready
        const timer = setTimeout(() => {
             // Only scroll if not already there (to avoid fighting with browser restoration)
             if (window.scrollY < 100 && target === 'founder') return;
             scrollToSection(target);
        }, 100);
        return () => clearTimeout(timer);
    }
  }, [activePage]);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section - Using Philosophy image from JSON */}
      <ParallaxHero 
        image={heroImage}
        height="h-[60vh] md:h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>

      <div className="w-full mx-auto px-6 pt-[96px] pr-[24px] pb-[0px] md:pl-[48px]">
        <div className="flex flex-col md:flex-row">
          
          {/* Sidebar */}
          <aside className="w-full md:w-1/2 shrink-0 relative md:sticky md:top-32 h-fit mb-12 md:mb-0">
            <nav className="flex flex-col space-y-6">
                
                {/* Founder */}
                <button
                    onClick={() => scrollToSection('founder')}
                    className={`text-left text-xl md:text-2xl font-sans transition-all duration-300 cursor-pointer ${
                        activeSection === 'founder' || !activeSection
                        ? 'text-black font-medium'
                        : 'text-gray-400 hover:text-black'
                    }`}
                >
                    {getTranslation(language, 'team.founder')}
                </button>

                {/* Directors Group */}
                <div className="flex flex-col space-y-2">
                    <button 
                        onClick={() => scrollToSection(getSectionId(DIRECTORS[0].name))}
                        className={`text-left text-xl md:text-2xl font-sans transition-all duration-300 ${
                            DIRECTORS.some(d => activeSection === getSectionId(d.name))
                            ? 'text-black font-medium'
                            : 'text-gray-400 hover:text-black'
                        }`}
                    >
                        {getTranslation(language, 'team.directors')}
                    </button>
                    <div className="pl-0 flex flex-col space-y-2">
                        {DIRECTORS.map(director => {
                             const id = getSectionId(director.name);
                             return (
                                <button
                                    key={director.name}
                                    onClick={() => scrollToSection(id)}
                                    className={`text-left text-xl md:text-2xl font-sans transition-all duration-300 ${
                                        activeSection === id
                                        ? 'text-black font-medium'
                                        : 'text-gray-400 hover:text-black'
                                    }`}
                                >
                                    {director.name}
                                </button>
                             );
                        })}
                    </div>
                </div>

                {/* Team */}
                <button
                    onClick={() => scrollToSection('team')}
                    className={`text-left text-xl md:text-2xl font-sans transition-all duration-300 ${
                        activeSection === 'team' || TEAM_GROUPS.some(g => activeSection === getSectionId(g.role))
                        ? 'text-black font-medium'
                        : 'text-gray-400 hover:text-black'
                    }`}
                >
                    {getTranslation(language, 'team.team')}
                </button>

            </nav>
          </aside>

          {/* Content Area */}
          <main className="w-full md:w-1/2 min-h-[50vh]">
            
            {/* Founder Section */}
            <div id="founder" className="flex flex-col gap-8 w-full md:max-w-2xl mb-24 scroll-mt-32">
                <Reveal>
                     {/* Founder Image Removed */}
                </Reveal>
                <Reveal delay={0.1}>
                    <h2 className="text-xl md:text-2xl font-sans text-black font-normal mb-6">
                        {FOUNDER.name}
                    </h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <div className="text-xl md:text-2xl font-sans text-black font-normal flex flex-col gap-6">
                        {(language === 'th' ? FOUNDER.bioTH : FOUNDER.bio).map((para, i) => (
                            <p key={i} className={language === 'th' ? 'leading-[1.82em] text-xl md:text-2xl' : 'text-xl md:text-2xl'}>{para}</p>
                        ))}
                         {FOUNDER.email && (
                            <a href={`mailto:${FOUNDER.email}`} className="text-gray-500 hover:text-black transition-colors mt-2 block">
                                {FOUNDER.email}
                            </a>
                        )}
                    </div>
                </Reveal>
            </div>

            {/* Directors Sections */}
            {DIRECTORS.map((director, index) => (
                <div key={director.name} id={getSectionId(director.name)} className="flex flex-col gap-8 w-full md:max-w-2xl mb-24 scroll-mt-32">
                    <Reveal delay={0.1}>
                        <h2 className="text-xl md:text-2xl font-sans text-black font-normal mb-6">
                            {director.name}
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="text-xl md:text-2xl font-sans text-black font-normal flex flex-col gap-6">
                            <p className={language === 'th' ? 'leading-[1.82em] text-xl md:text-2xl' : 'text-xl md:text-2xl'}>
                                {language === 'th' ? director.roleTH : director.role}
                            </p>
                             {director.email && (
                                <a href={`mailto:${director.email}`} className="text-gray-500 hover:text-black transition-colors mt-2 block">
                                    {director.email}
                                </a>
                            )}
                        </div>
                    </Reveal>
                </div>
            ))}

            {/* Team Section */}
            <div id="team" className="w-full md:max-w-2xl pb-24 scroll-mt-32">
                <div className="space-y-12">
                    {TEAM_GROUPS.map((group, index) => (
                        <Reveal key={group.role} delay={index * 0.05}>
                            <div id={getSectionId(group.role)} className="flex flex-col gap-6 scroll-mt-32">
                                <h3 className="text-xl md:text-2xl font-sans text-black font-normal">
                                    {language === 'th' ? group.roleTH : group.role}
                                </h3>
                                <div className="flex flex-col gap-1">
                                    {(language === 'th' && group.membersTH ? group.membersTH : group.members).map(member => (
                                        <p key={member} className="text-xl md:text-2xl font-sans text-black font-normal">
                                            {member}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
