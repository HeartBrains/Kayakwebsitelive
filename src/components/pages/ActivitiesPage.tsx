import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../utils/languageContext';
import { MOCK_POSTS_BILINGUAL, ACTIVITY_HERO_IMAGE } from '../../utils/mockDataBilingual';

interface ActivitiesPageProps {
  onNavigate: (page: string, slug?: string) => void;
  activeSection?: string;
}

type Category = 'current' | 'upcoming';

export function ActivitiesPage({ onNavigate, activeSection }: ActivitiesPageProps) {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>(
    (activeSection as Category) || 'current'
  );

  // Update activeCategory when activeSection prop changes
  useEffect(() => {
    if (activeSection) {
      setActiveCategory(activeSection as Category);
    }
  }, [activeSection]);

  // Get all activities
  const allPosts = Object.values(MOCK_POSTS_BILINGUAL);
  const allActivities = allPosts.filter(item => item.en.type === 'activity');

  // 'k-bar-experience' is Current
  const currentActivities = allActivities.filter(item => 
    ['k-bar-experience'].includes(item.en.slug) || (item.en.date && item.en.date.includes('Permanent'))
  );
  
  const upcomingActivities = allActivities.filter(item => 
    item.en.date && item.en.date.includes('Upcoming')
  );

  const filteredData = activeCategory === 'current' ? currentActivities : upcomingActivities;

  return (
    <div className="w-full bg-white pb-24 min-h-screen font-sans text-black">
      {/* Hero - Using K-BAR image from JSON */}
      <ParallaxHero 
        image={ACTIVITY_HERO_IMAGE}
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </ParallaxHero>

      {/* Main Content */}
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
                        <span>{language === 'th' ? 'กิจกรรม' : 'Activities'}</span>
                    </button>
                    <button 
                        onClick={() => setActiveCategory('upcoming')}
                        className={`text-xl md:text-2xl font-sans text-left transition-colors duration-300 flex flex-col items-start ${
                            activeCategory === 'upcoming' ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <span>{language === 'th' ? 'กิจกรรมที่กำลังจะเกิดขึ้น' : 'Upcoming Activities'}</span>
                    </button>
                </div>
            </div>

            {/* Right Content - Activities List */}
            <div className="w-full md:w-1/2">
                <div className="space-y-16 md:space-y-24">
                    {filteredData.length > 0 ? (
                        filteredData.map((item, idx) => (
                            <div 
                                key={item.en.id}
                                className="flex flex-col gap-6 w-full md:w-[45vw] cursor-pointer group"
                                onClick={() => onNavigate('activity-detail', item.en.slug)}
                            >
                                <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                                    <ImageWithFallback 
                                        src={item.en.featuredImage.sourceUrl} 
                                        alt={item.en.title}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col gap-6">
                                    {/* English */}
                                    {language !== 'th' && (
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-lg md:text-xl font-normal text-black leading-tight whitespace-pre-wrap">
                                                    {item.en.title}
                                                </h3>
                                                 {item.en.acf?.type_label && (
                                                    <p className="text-lg md:text-xl font-normal text-gray-500 leading-tight">
                                                        {item.en.acf.type_label}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Thai */}
                                    {language === 'th' && (
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-lg md:text-xl font-normal text-black leading-[1.82em] font-sans whitespace-pre-wrap">
                                                    {item.th.title}
                                                </h3>
                                                 {item.th.acf?.type_label && (
                                                    <p className="text-lg md:text-xl font-normal text-gray-500 leading-[1.82em] font-sans">
                                                        {item.th.acf.type_label}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
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