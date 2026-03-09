import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../utils/languageContext';
import { MOCK_POSTS_BILINGUAL, EXHIBITIONS_HERO_IMAGE } from '../../utils/mockDataBilingual';

interface ExhibitionsPageProps {
    onNavigate?: (page: string, slug?: string) => void;
    activeSection?: string;
}

type Category = 'current' | 'upcoming';

export function ExhibitionsPage({ onNavigate, activeSection }: ExhibitionsPageProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(
    (activeSection as Category) || 'current'
  );
  const { language } = useLanguage();

  // Update activeCategory when activeSection prop changes
  useEffect(() => {
    if (activeSection) {
      setActiveCategory(activeSection as Category);
    }
  }, [activeSection]);

  // Get all exhibitions
  const allPosts = Object.values(MOCK_POSTS_BILINGUAL);
  const allExhibitions = allPosts.filter(item => item.en.type === 'exhibition');

  const currentExhibitions = allExhibitions.filter(item => 
    item.en.date && item.en.date.includes('Permanent')
  );
  
  const upcomingExhibitions = allExhibitions.filter(item => 
    item.en.date && item.en.date.includes('Upcoming')
  );

  const filteredExhibitions = activeCategory === 'current' ? currentExhibitions : upcomingExhibitions;

  return (
    <div className="w-full bg-white min-h-screen pb-24">
      {/* Hero Section - Using Madrid Circle image from JSON */}
      <ParallaxHero 
        image={EXHIBITIONS_HERO_IMAGE}
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </ParallaxHero>

      {/* Content Container */}
      <div className="w-full px-6 pt-[96px] pr-[24px] pb-[0px] md:pl-[48px]">
        <div className="flex flex-col md:flex-row">
            
            {/* Left Sidebar - Navigation */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <div className="sticky top-32 flex flex-col items-start gap-4">
                    <button 
                        onClick={() => setActiveCategory('current')}
                        className={`text-xl md:text-2xl font-sans text-left transition-colors duration-300 flex flex-col items-start ${
                            activeCategory === 'current' ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <span>{language === 'th' ? 'นิทรรศการปัจจุบัน' : 'Current Exhibitions'}</span>
                    </button>
                    <button 
                        onClick={() => setActiveCategory('upcoming')}
                        className={`text-xl md:text-2xl font-sans text-left transition-colors duration-300 flex flex-col items-start ${
                            activeCategory === 'upcoming' ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <span>{language === 'th' ? 'นิทรรศการที่จะมา' : 'Upcoming Exhibitions'}</span>
                    </button>
                </div>
            </div>

            {/* Right Content - Exhibition List */}
            <div className="w-full md:w-1/2">
                <div className="space-y-16 md:space-y-24">
                    {filteredExhibitions.length > 0 ? (
                        filteredExhibitions.map((item, index) => (
                            <Reveal key={item.en.id} delay={index * 0.1}>
                                <div 
                                    className="flex flex-col gap-6 w-full md:w-[45vw] cursor-pointer group"
                                    onClick={() => onNavigate && onNavigate('exhibition-detail', item.en.slug)}
                                >
                                    {/* Image */}
                                    <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                                        <ImageWithFallback 
                                            src={item.en.featuredImage.sourceUrl}
                                            alt={item.en.title}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-col gap-6">
                                        {/* English */}
                                        {language !== 'th' && (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-1">
                                                  <h3 className="text-lg md:text-xl font-normal leading-tight font-sans text-black">{item.en.title}</h3>
                                                  {item.en.acf?.artist && (
                                                      <p className="text-lg md:text-xl font-normal text-black leading-tight font-sans">{item.en.acf.artist}</p>
                                                  )}
                                                </div>
                                                
                                                {item.en.acf?.listing_summary && (
                                                    <p className="text-lg md:text-xl font-normal text-gray-600 leading-tight font-sans line-clamp-3">
                                                      {item.en.acf.listing_summary}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Thai */}
                                        {language === 'th' && (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-1">
                                                  <h3 className="text-lg md:text-xl font-normal font-sans text-black leading-[1.82em]">{item.th.title}</h3>
                                                  {item.th.acf?.artist && (
                                                      <p className="text-lg md:text-xl font-normal text-black font-sans leading-[1.82em]">{item.th.acf.artist}</p>
                                                  )}
                                                </div>
                                                
                                                {item.th.acf?.listing_summary && (
                                                    <p className="text-lg md:text-xl font-normal text-gray-600 font-sans line-clamp-3 leading-[1.82em]">
                                                      {item.th.acf.listing_summary}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Reveal>
                        ))
                    ) : (
                        <div className="py-20 text-gray-400 font-sans text-xl">
                            {language === 'th' ? 'ไม่พบข้อมูล' : 'No results found'}
                        </div>
                    )}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}