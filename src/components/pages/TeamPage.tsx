import { useEffect } from 'react';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useLanguage } from '../../utils/languageContext';
import { TEAM_MEMBERS, ADVISORY_BOARD_WITH_TITLES, ADVISORY_BOARD_MEMBERS } from '../../utils/teamDataBilingual';
import heroImage from "figma:asset/206bfbf36c5300541efa9f2ed27225a361bd0d87.png";

interface TeamPageProps {
    activePage?: 'team' | 'advisory-board';
    onNavigate?: (page: string) => void;
}

export function TeamPage({ activePage = 'team' }: TeamPageProps) {
  const { language } = useLanguage();

  // Handle auto-scroll to section
  useEffect(() => {
    if (activePage) {
        const el = document.getElementById(activePage);
        if (el) {
            // Small delay to ensure rendering
            setTimeout(() => {
                const offset = 100; // Header height approx
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
            
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }, 100);
        }
    }
  }, [activePage]);

  return (
    <div className="relative w-full min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <ParallaxHero 
        image={heroImage}
        height="h-[60vh] md:h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </ParallaxHero>

      <div className="w-full mx-auto px-6 pt-[96px] pr-[24px] pb-[0px] md:pl-[48px]">
        
        {/* Team Section */}
        <section id="team" className="flex flex-col md:flex-row mb-32 md:mb-40">
            {/* Left Column - Title */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <Reveal>
                    <h2 className={`text-xl md:text-2xl font-normal sticky top-32 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                        {language === 'th' ? 'ทีมงาน' : 'Team'}
                    </h2>
                </Reveal>
            </div>

            {/* Right Column - Content */}
            <div className="w-full md:w-1/2 flex flex-col gap-12">
                {TEAM_MEMBERS.map((member, idx) => (
                    <Reveal key={idx} delay={idx * 0.05}>
                        <div className="flex flex-col text-xl md:text-2xl font-sans text-black font-normal">
                            {/* Name */}
                            <div>
                                {member.name}
                            </div>
                            {/* Role */}
                            <div className="text-gray-500">
                                {language === 'th' ? member.roleTH : member.role}
                            </div>
                            {/* Email */}
                            <div>
                                {member.email && (
                                    <a href={`mailto:${member.email}`} className="hover:text-gray-600 transition-colors">
                                        {member.email}
                                    </a>
                                )}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>

        {/* Advisory Board Section */}
        <section id="advisory-board" className="flex flex-col md:flex-row mb-12">
            {/* Left Column - Title */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <Reveal>
                    <h2 className={`text-xl md:text-2xl font-normal sticky top-32 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                        {language === 'th' ? 'คณะกรรมการที่ปรึกษา' : 'Advisory Board'}
                    </h2>
                </Reveal>
            </div>

            {/* Right Column - Content */}
            <div className="w-full md:w-1/2 flex flex-col gap-12">
                
                {/* With Titles */}
                <div className="flex flex-col gap-12">
                    {ADVISORY_BOARD_WITH_TITLES.map((person, idx) => (
                        <Reveal key={idx} delay={idx * 0.05}>
                            <div className="flex flex-col text-xl md:text-2xl font-sans text-black font-normal">
                                <div>
                                    {person.name}
                                </div>
                                <div>
                                    {language === 'th' && person.titleTH ? person.titleTH : person.title}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Divider */}
                <Reveal>
                    <hr className="border-black border-t-[1px] w-full" />
                </Reveal>

                {/* Members only */}
                <div className="flex flex-col gap-4">
                    {ADVISORY_BOARD_MEMBERS.map((member, idx) => (
                        <Reveal key={idx} delay={idx * 0.05}>
                            <p className="text-xl md:text-2xl font-sans text-black font-normal">
                                {member}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}
