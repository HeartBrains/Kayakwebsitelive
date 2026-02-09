import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ParallaxHero } from '../ui/ParallaxHero';
import { Reveal } from '../ui/Reveal';
import { useState } from 'react';
import { ARTISTS_DATA } from '../../utils/residencyData';
import { useLanguage } from '../../utils/languageContext';
import { getTranslation } from '../../utils/translations';
import { IMG_FOG_SRC, IMG_PULSUS_SRC } from '../../utils/mockDataBilingual';

interface ResidencyPageProps {
  onNavigate?: (page: string, slug?: string) => void;
}

export function ResidencyPage({ onNavigate }: ResidencyPageProps) {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'current' | 'previous'>('current');

  const filteredArtists = ARTISTS_DATA.filter(artist => artist.category === activeCategory);

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans">
      {/* Hero Section */}
      <ParallaxHero 
        image={IMG_FOG_SRC} 
        height="h-[80vh]"
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center z-20">

        </div>
      </ParallaxHero>

      {/* Content */}
      <div className="w-full px-6 md:px-12 py-12 md:py-16">
        <section className="flex flex-col md:flex-row">
            {/* Left Column */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <div className="sticky top-32 flex flex-col items-start gap-4">
                    <Reveal>
                        <button 
                            onClick={() => setActiveCategory('current')}
                            className={`text-xl md:text-2xl font-normal leading-tight transition-colors duration-300 block text-left ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                                activeCategory === 'current' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {getTranslation(language, 'residency.currentArtists')}
                        </button>
                        <button 
                            onClick={() => setActiveCategory('previous')}
                            className={`text-xl md:text-2xl font-normal leading-tight transition-colors duration-300 mt-8 ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                                activeCategory === 'previous' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {getTranslation(language, 'residency.pastArtists')}
                        </button>
                    </Reveal>
                </div>
            </div>
            
            {/* Right Column */}
            <div className="w-full md:w-1/2 flex flex-col gap-12 md:gap-24">
                {filteredArtists.length > 0 ? (
                    filteredArtists.map((artist, index) => (
                        <Reveal key={artist.id} delay={index * 0.1}>
                            <div 
                                className="flex flex-col gap-6 w-full md:w-[45vw] cursor-pointer group"
                                onClick={() => onNavigate?.('artist-detail', artist.slug)} 
                            >
                                <div className="aspect-[3/4] w-full bg-gray-100 relative overflow-hidden">
                                    <ImageWithFallback 
                                        src={artist.category === 'current' ? IMG_PULSUS_SRC : artist.image}
                                        alt={language === 'th' ? artist.nameTH : artist.name}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className={`text-lg md:text-xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{language === 'th' ? artist.nameTH : artist.name}</h3>
                                    <p className={`text-lg md:text-xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{language === 'th' ? artist.periodTH : artist.period}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))
                ) : (
                     <Reveal>
                        <p className="text-lg md:text-xl text-gray-400">{getTranslation(language, 'common.noResults')}</p>
                     </Reveal>
                )}
            </div>
        </section>
      </div>
    </div>
  );
}
