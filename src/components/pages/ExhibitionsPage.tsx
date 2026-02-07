import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../../utils/languageContext';
import { getMockPostsByType, EXHIBITIONS_HERO_IMAGE } from '../../utils/mockDataBilingual';

interface ExhibitionsPageProps {
    onNavigate?: (page: string, slug?: string) => void;
}

type Category = 'current' | 'past';

export function ExhibitionsPage({ onNavigate }: ExhibitionsPageProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('current');
  const { language, t } = useLanguage();

  // Get all exhibitions in current language
  const allExhibitions = getMockPostsByType('exhibition', language);

  const currentExhibitions = allExhibitions.filter(ex => 
    ex.date && ex.date.includes('Permanent')
  );
  
  const pastExhibitions = allExhibitions.filter(ex => 
    ex.date && ex.date.includes('Past')
  );

  const filteredExhibitions = activeCategory === 'current' ? currentExhibitions : pastExhibitions;

  return (
    <div className="w-full bg-white min-h-screen pb-24">
      {/* Hero Section - Using Madrid Circle image from JSON */}
      <ParallaxHero 
        image={EXHIBITIONS_HERO_IMAGE}
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>

      {/* Content Container */}
      <div className="w-full px-6 pt-[96px] pr-[24px] pb-[0px] md:pl-[48px]">
        <div className="flex flex-col md:flex-row">
            
            {/* Left Sidebar - Navigation */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <div className="sticky top-32 flex flex-col items-start gap-4">
                    <button 
                        onClick={() => setActiveCategory('current')}
                        className={`text-xl md:text-2xl font-sans text-left transition-colors duration-300 ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                            activeCategory === 'current' ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {t('exhibitions.current')}
                    </button>
                    <button 
                        onClick={() => setActiveCategory('past')}
                        className={`text-xl md:text-2xl font-sans text-left transition-colors duration-300 ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                            activeCategory === 'past' ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {language === 'th' ? 'นิทรรศการที่ผ่านมา' : 'Past Exhibitions'}
                    </button>
                </div>
            </div>

            {/* Right Content - Exhibition List */}
            <div className="w-full md:w-1/2">
                <div className="space-y-16 md:space-y-24">
                    {filteredExhibitions.length > 0 ? (
                        filteredExhibitions.map((item, index) => (
                            <Reveal key={item.id} delay={index * 0.1}>
                                <div 
                                    className="flex flex-col gap-6 w-full md:w-[45vw] cursor-pointer group"
                                    onClick={() => onNavigate && onNavigate('exhibition-detail', item.slug)}
                                >
                                    {/* Image */}
                                    <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                                        <ImageWithFallback 
                                            src={item.featuredImage.sourceUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-1">
                                          <h3 className={`text-lg md:text-xl font-normal leading-tight font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.title}</h3>
                                          {item.acf?.artist && (
                                              <p className={`text-lg md:text-xl font-normal text-black leading-tight font-sans ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.acf.artist}</p>
                                          )}
                                        </div>
                                        
                                        {item.acf?.listing_summary && (
                                            <p className={`text-lg md:text-xl font-normal text-gray-600 leading-tight font-sans line-clamp-3 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                              {item.acf.listing_summary}
                                            </p>
                                        )}
                                        

                                    </div>
                                </div>
                            </Reveal>
                        ))
                    ) : (
                        <div className="py-20 text-gray-400 font-sans text-xl">
                            {t('common.noResults')}
                        </div>
                    )}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
