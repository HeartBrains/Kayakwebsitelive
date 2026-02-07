import { ImageWithFallback } from '../figma/ImageWithFallback';
import { HeroSlider } from '../ui/HeroSlider';
import { useLanguage } from '../../utils/languageContext';
import { getMockPostsByType } from '../../utils/mockDataBilingual';

export function HomePage({ onNavigate }: { onNavigate?: (page: string, slug?: string) => void }) {
  const { language, t } = useLanguage();

  // Get content dynamically from mock data
  const allExhibitions = getMockPostsByType('exhibition', language);
  const allActivities = getMockPostsByType('activity', language);
  
  // Filter for Current (Permanent) Exhibitions
  const currentExhibitions = allExhibitions.filter(ex => 
    ex.date && ex.date.includes('Permanent')
  );

  // Current Activities (Filter out past 2025/Closed items)
  // Today is 2026.
  const currentActivities = allActivities.filter(act => 
    !act.date.includes('2025') && !act.date.includes('Closed')
  );

  // Derive Hero Images from Current Exhibitions + Current Activities
  // Limit to 5 images max
  const heroImages = [
    ...currentExhibitions.map(ex => ex.featuredImage.sourceUrl),
    ...currentActivities.map(act => act.featuredImage.sourceUrl)
  ].slice(0, 5);

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      {/* Hero Section */}
      <HeroSlider 
        images={heroImages} 
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </HeroSlider>

      <div className="w-full px-6 pt-[96px] pr-[24px] pb-[0px] md:pl-[48px]">
        
        {/* Current Exhibitions */}
        <section className="flex flex-col md:flex-row mb-32 md:mb-40">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
             <h2 className={`text-xl md:text-2xl font-normal sticky top-32 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{t('exhibitions.current')}</h2>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-12 md:gap-16">
             {currentExhibitions.map((item) => (
                <div key={item.id} className="flex flex-col gap-6 w-full md:w-[45vw] cursor-pointer group" onClick={() => onNavigate?.('exhibition-detail', item.slug)}>
                    <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden relative">
                        <ImageWithFallback 
                            src={item.featuredImage.sourceUrl} 
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className={`text-lg md:text-xl font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.title}</h3>
                        <p className={`text-lg md:text-xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{item.acf?.artist}</p>
                        
                        {item.acf?.listing_summary && (
                            <p className={`text-lg md:text-xl font-normal text-gray-600 leading-tight mt-1 line-clamp-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                {item.acf.listing_summary}
                            </p>
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
                <h2 className={`text-xl md:text-2xl font-normal sticky top-32 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                    {language === 'th' ? 'กิจกรรมปัจจุบัน' : 'Current Activities'}
                </h2>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-12">
                {currentActivities.map((item) => (
                    <div key={item.id} className="flex flex-col gap-6 w-full md:w-[45vw] cursor-pointer group" onClick={() => onNavigate?.('activity-detail', item.slug)}>
                        <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden relative">
                            <ImageWithFallback 
                                src={item.featuredImage.sourceUrl} 
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className={`text-lg md:text-xl font-normal leading-tight whitespace-pre-wrap ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                {item.title}
                            </h3>
                            {item.acf?.listing_summary && (
                                <p className={`text-lg md:text-xl font-normal text-gray-600 leading-tight mt-1 line-clamp-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                    {item.acf.listing_summary}
                                </p>
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
