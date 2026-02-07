import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useState } from 'react';
import { useLanguage } from '../../utils/languageContext';
import { getMockPostsByType, ACTIVITY_HERO_IMAGE } from '../../utils/mockDataBilingual';

interface ActivitiesPageProps {
  onNavigate: (page: string, slug?: string) => void;
}

type Category = 'current' | 'past';

export function ActivitiesPage({ onNavigate }: ActivitiesPageProps) {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('current');

  // Get all activities in current language
  const allActivities = getMockPostsByType('activity', language);

  // 'k-bar-experience' is Current
  const currentActivities = allActivities.filter(act => 
    ['k-bar-experience'].includes(act.slug) || (act.date && act.date.includes('Permanent'))
  );
  
  const pastActivities = allActivities.filter(act => 
    !['k-bar-experience'].includes(act.slug) && (!act.date || !act.date.includes('Permanent'))
  );

  const filteredData = activeCategory === 'current' ? currentActivities : pastActivities;

  return (
    <div className="w-full bg-white pb-24 min-h-screen font-sans text-black">
      {/* Hero - Using K-BAR image from JSON */}
      <ParallaxHero 
        image={ACTIVITY_HERO_IMAGE}
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>

      {/* Main Content */}
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
                        {t('nav.activities')}
                    </button>
                    <button 
                        onClick={() => setActiveCategory('past')}
                        className={`text-xl md:text-2xl font-sans text-left transition-colors duration-300 ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                            activeCategory === 'past' ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {language === 'th' ? 'กิจกรรมที่ผ่านมา' : 'Past Activities'}
                    </button>
                </div>
            </div>

            {/* Right Content - Activities List */}
            <div className="w-full md:w-1/2">
                <div className="space-y-16 md:space-y-24">
                    {filteredData.length > 0 ? (
                        filteredData.map((item, idx) => (
                            <Reveal key={item.id} delay={idx * 0.1}>
                                <div 
                                    className="flex flex-col gap-6 w-full md:w-[45vw] cursor-pointer group"
                                    onClick={() => onNavigate('activity-detail', item.slug)}
                                >
                                    <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                                        <ImageWithFallback 
                                            src={item.featuredImage.sourceUrl} 
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-1">
                                            <h3 className={`text-lg md:text-xl font-normal text-black leading-tight whitespace-pre-wrap ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                                {item.title}
                                            </h3>
                                             {item.acf?.type_label && (
                                                <p className={`text-lg md:text-xl font-normal text-gray-500 leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                                    {item.acf.type_label}
                                                </p>
                                            )}
                                        </div>
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
