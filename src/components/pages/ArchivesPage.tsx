import { useState, useEffect, useMemo } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useLanguage } from '../../utils/languageContext';
import { IMG_MADRID_SRC, getMockPostsByType } from '../../utils/mockDataBilingual';
import { WPPost } from '../../utils/types';

// Helper to extract the relevant year from a date string
const getYearFromDate = (dateStr: string): string => {
    const matches = dateStr.match(/\b20\d{2}\b/g);
    if (matches && matches.length > 0) {
        return matches[matches.length - 1];
    }
    // Fallback if no year found? Or assume current year/specific default?
    return '2025'; 
};

interface ArchivesPageProps {
  onNavigate: (page: string, slug?: string, backTo?: string) => void;
}

export function ArchivesPage({ onNavigate }: ArchivesPageProps) {
  const { language, t } = useLanguage();
  
  // State for loaded data
  const [exhibitions, setExhibitions] = useState<WPPost[]>([]);
  const [activities, setActivities] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter state
  const [activeFilter, setActiveFilter] = useState<{
      category: 'exhibition' | 'activity' | null;
      year: string | null | 'all';
  }>({ category: null, year: null });

  useEffect(() => {
    // Load data from mock (simulating fetch)
    const loadRecords = () => {
      setLoading(true);
      
      const allExhibitions = getMockPostsByType('exhibition', language);
      const allActivities = getMockPostsByType('activity', language);

      // Filter for PAST items
      // Logic: "Past" keyword OR explicit 2025 date for activities/exhibitions that are over
      const pastExhibitions = allExhibitions.filter(ex => 
        (ex.date && (ex.date.toLowerCase().includes('past') || ex.date.includes('ผ่านมา'))) || 
        (ex.date && ex.date.includes('2025') && !ex.date.toLowerCase().includes('permanent') && !ex.date.includes('ถาวร'))
      );

      const pastActivities = allActivities.filter(act => 
        (act.date && act.date.includes('2025')) ||
        (act.date && (act.date.toLowerCase().includes('closed') || act.date.includes('ปิด')))
      );

      setExhibitions(pastExhibitions);
      setActivities(pastActivities);
      setLoading(false);
    };

    loadRecords();
  }, [language]);

  const availableFilters = useMemo(() => {
      const exhibitionYears = new Set<string>();
      const activityYears = new Set<string>();

      exhibitions.forEach(record => {
          const year = getYearFromDate(record.date || '');
          if (year) exhibitionYears.add(year);
      });

      activities.forEach(record => {
          const year = getYearFromDate(record.date || '');
          if (year) activityYears.add(year);
      });

      return {
          exhibitions: Array.from(exhibitionYears).sort((a, b) => b.localeCompare(a)), 
          activities: Array.from(activityYears).sort((a, b) => b.localeCompare(a))
      };
  }, [exhibitions, activities]);

  const displayedRecords = useMemo(() => {
      let records: { item: WPPost, category: 'exhibition' | 'activity' }[] = [];

      // If no category selected, show everything (or could show nothing/featured)
      // The design usually implies showing all if nothing is active, OR show based on selection.
      // Let's default to showing ALL if nothing selected, or specific if selected.
      
      if (!activeFilter.category) {
           // Combine both
           records = [
               ...exhibitions.map(e => ({ item: e, category: 'exhibition' as const })),
               ...activities.map(a => ({ item: a, category: 'activity' as const }))
           ];
      } else {
          if (activeFilter.category === 'exhibition') {
              records = exhibitions.map(e => ({ item: e, category: 'exhibition' as const }));
          } else {
              records = activities.map(a => ({ item: a, category: 'activity' as const }));
          }
      }

      // Filter by Year
      if (activeFilter.year && activeFilter.year !== 'all') {
          records = records.filter(r => getYearFromDate(r.item.date || '') === activeFilter.year);
      }

      return records;
  }, [exhibitions, activities, activeFilter]);

  const handleFilterClick = (category: 'exhibition' | 'activity', year: string | 'all') => {
      if (activeFilter.category === category && activeFilter.year === year) {
          // Toggle off if clicking same
          setActiveFilter({ category: null, year: null });
      } else {
          setActiveFilter({ category, year });
      }
  };

  const handleItemClick = (record: { item: WPPost, category: 'exhibition' | 'activity' }) => {
      if (record.category === 'exhibition') {
          onNavigate('exhibition-detail', record.item.slug, 'archives');
      } else {
          onNavigate('activity-detail', record.item.slug, 'archives');
      }
  };

  return (
    <div className="w-full bg-white min-h-screen pb-24">
      <ParallaxHero 
        image={IMG_MADRID_SRC}
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </ParallaxHero>

      <div className="w-full px-6 pt-[96px] pr-[24px] pb-[0px] md:pl-[48px]">
        
        <div className="flex flex-col md:flex-row">
            
            {/* Sidebar */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
                <div className="md:sticky md:top-32 flex flex-col gap-12">
                    
                    {/* Past Exhibition */}
                    <div className="flex flex-col gap-4">
                        <h3 
                            onClick={() => handleFilterClick('exhibition', 'all')}
                            className={`text-xl md:text-2xl font-sans cursor-pointer transition-colors ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                                activeFilter.category === 'exhibition' && activeFilter.year === 'all'
                                ? 'text-black font-medium'
                                : 'text-black font-medium hover:text-gray-600'
                            }`}
                        >
                            {language === 'th' ? 'นิทรรศการที่ผ่านมา' : 'Past Exhibitions'}
                        </h3>
                        <div className="flex flex-col gap-2">
                            {availableFilters.exhibitions.length > 0 ? (
                                availableFilters.exhibitions.map(year => (
                                    <button 
                                        key={`exh-${year}`}
                                        onClick={() => handleFilterClick('exhibition', year)}
                                        className={`text-xl md:text-2xl text-left font-sans transition-colors ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                                            activeFilter.category === 'exhibition' && activeFilter.year === year
                                            ? 'text-black font-medium'
                                            : 'text-gray-400 font-normal hover:text-gray-600'
                                        }`}
                                    >
                                        {year}
                                    </button>
                                ))
                            ) : (
                                <span className={`text-gray-300 font-sans text-lg ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{language === 'th' ? 'ไม่มีข้อมูล' : 'No past exhibitions'}</span>
                            )}
                        </div>
                    </div>

                    {/* Past Activities */}
                    <div className="flex flex-col gap-4">
                        <h3 
                            onClick={() => handleFilterClick('activity', 'all')}
                            className={`text-xl md:text-2xl font-sans cursor-pointer transition-colors ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                                activeFilter.category === 'activity' && activeFilter.year === 'all'
                                ? 'text-black font-medium'
                                : 'text-black font-medium hover:text-gray-600'
                            }`}
                        >
                            {language === 'th' ? 'กิจกรรมที่ผ่านมา' : 'Past Activities'}
                        </h3>
                        <div className="flex flex-col gap-2">
                            {availableFilters.activities.length > 0 ? (
                                availableFilters.activities.map(year => (
                                    <button 
                                        key={`act-${year}`}
                                        onClick={() => handleFilterClick('activity', year)}
                                        className={`text-xl md:text-2xl text-left font-sans transition-colors ${language === 'th' ? 'leading-[1.82em]' : ''} ${
                                            activeFilter.category === 'activity' && activeFilter.year === year
                                            ? 'text-black font-medium'
                                            : 'text-gray-400 font-normal hover:text-gray-600'
                                        }`}
                                    >
                                        {year}
                                    </button>
                                ))
                            ) : (
                                <span className={`text-gray-300 font-sans text-lg ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{language === 'th' ? 'ไม่มีข้อมูล' : 'No past activities'}</span>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2">
                <div className="space-y-16 md:space-y-24">
                    {loading ? (
                        <div className="py-20 text-gray-400 font-sans text-xl">Loading archives...</div>
                    ) : displayedRecords.length > 0 ? (
                        displayedRecords.map((record, index) => (
                            <Reveal key={record.item.id} delay={index * 0.1}>
                                <div 
                                    className="flex flex-col gap-6 w-full md:w-[45vw] cursor-pointer group"
                                    onClick={() => handleItemClick(record)}
                                >
                                    {/* Image */}
                                    <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                                        <ImageWithFallback 
                                            src={record.item.featuredImage.sourceUrl} 
                                            alt={record.item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-col gap-1">
                                        <h3 className={`text-lg md:text-xl font-normal leading-tight font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{record.item.title}</h3>
                                        
                                        {/* Artist Name if Exhibition */}
                                        {record.category === 'exhibition' && record.item.acf?.artist && (
                                            <p className={`text-lg md:text-xl font-normal text-black leading-tight font-sans ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                                {record.item.acf.artist}
                                            </p>
                                        )}

                                        {/* Date */}
                                        <p className={`text-lg md:text-xl font-normal text-gray-500 leading-tight mt-1 font-sans ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                            {record.item.date}
                                        </p>

                                        {/* Summary (optional) */}
                                        {record.item.acf?.listing_summary && (
                                            <p className={`text-lg md:text-xl font-normal text-gray-600 leading-tight mt-1 line-clamp-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                                {record.item.acf.listing_summary}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Reveal>
                        ))
                    ) : (
                        <div className="py-20 text-gray-400 font-sans text-xl">
                            {language === 'th' ? 'ไม่พบข้อมูลในหมวดหมู่นี้' : 'No archives found for this selection.'}
                        </div>
                    )}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}
