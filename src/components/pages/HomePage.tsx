import { ImageWithFallback } from '../figma/ImageWithFallback';
import { HeroSlider } from '../ui/HeroSlider';
import { useLanguage } from '../../utils/languageContext';
import { MOCK_POSTS_BILINGUAL, HOME_HERO_IMAGES } from '../../utils/mockDataBilingual';

export function HomePage({ onNavigate }: { onNavigate?: (page: string, slug?: string) => void }) {
  const { language } = useLanguage();

  // Get content dynamically from mock data
  const allPosts = Object.values(MOCK_POSTS_BILINGUAL);
  
  // Filter for Current (Permanent) Exhibitions
  const currentExhibitions = allPosts.filter(item => 
    item.en.type === 'exhibition' && 
    item.en.date && item.en.date.includes('Permanent')
  );

  // Current Activities (Filter out past 2025/Closed items)
  // Today is 2026.
  const currentActivities = allPosts.filter(item => 
    item.en.type === 'activity' &&
    !item.en.date.includes('2025') && !item.en.date.includes('Closed')
  );

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      {/* Hero Section - Using all 6 images from CSV */}
      <HeroSlider 
        images={HOME_HERO_IMAGES} 
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </HeroSlider>

      <div className="w-full px-6 pt-[96px] pr-[24px] pb-[0px] md:pl-[48px]">
        
        {/* Current Exhibitions */}
        <section className="flex flex-col md:flex-row mb-32 md:mb-40">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
             <h2 className="text-xl md:text-2xl font-normal sticky top-32">
                {language === 'th' ? 'นิทรรศการปัจจุบัน' : 'Current Exhibitions'}
             </h2>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-12 md:gap-16">
             {currentExhibitions.map((item) => (
                <div key={item.en.id} className="flex flex-col gap-6 w-full md:w-[45vw] cursor-pointer group" onClick={() => onNavigate?.('exhibition-detail', item.en.slug)}>
                    <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden relative">
                        <ImageWithFallback 
                            src={item.en.featuredImage.sourceUrl} 
                            alt={item.en.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        {/* English Content */}
                        {language !== 'th' && (
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg md:text-xl font-normal leading-tight">{item.en.title}</h3>
                                <p className="text-lg md:text-xl font-normal text-black leading-tight">{item.en.acf?.artist}</p>
                                
                                {item.en.acf?.listing_summary && (
                                    <p className="text-lg md:text-xl font-normal text-gray-600 leading-tight mt-1 line-clamp-2">
                                        {item.en.acf.listing_summary}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Thai Content */}
                        {language === 'th' && (
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg md:text-xl font-normal font-sans leading-[1.82em]">{item.th.title}</h3>
                                <p className="text-lg md:text-xl font-normal font-sans text-black leading-[1.82em]">{item.th.acf?.artist}</p>
                                
                                {item.th.acf?.listing_summary && (
                                    <p className="text-lg md:text-xl font-normal font-sans text-gray-600 leading-[1.82em] mt-1 line-clamp-2">
                                        {item.th.acf.listing_summary}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
             ))}
          </div>
        </section>

        {/* Current Activities (Replaces Past Exhibitions) */}
        {currentActivities.length > 0 && (
            <section className="flex flex-col md:flex-row mb-32 md:mb-40">
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <h2 className="text-xl md:text-2xl font-normal sticky top-32">
                    {language === 'th' ? 'กิจกรรมปัจจุบัน' : 'Current Activities'}
                </h2>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-12">
                {currentActivities.map((item) => (
                    <div key={item.en.id} className="flex flex-col gap-6 w-full md:w-[45vw] cursor-pointer group" onClick={() => onNavigate?.('activity-detail', item.en.slug)}>
                        <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden relative">
                            <ImageWithFallback 
                                src={item.en.featuredImage.sourceUrl} 
                                alt={item.en.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            {/* English Content */}
                            {language !== 'th' && (
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg md:text-xl font-normal leading-tight whitespace-pre-wrap">
                                        {item.en.title}
                                    </h3>
                                    {item.en.acf?.listing_summary && (
                                        <p className="text-lg md:text-xl font-normal text-gray-600 leading-tight mt-1 line-clamp-2">
                                            {item.en.acf.listing_summary}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Thai Content */}
                            {language === 'th' && (
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg md:text-xl font-normal font-sans leading-[1.82em] whitespace-pre-wrap">
                                        {item.th.title}
                                    </h3>
                                    {item.th.acf?.listing_summary && (
                                        <p className="text-lg md:text-xl font-normal font-sans text-gray-600 leading-[1.82em] mt-1 line-clamp-2">
                                            {item.th.acf.listing_summary}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            </section>
        )}

      </div>
    </div>
  );
}