import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from 'react';
import { WPPost } from '../../utils/types';
import { Reveal } from '../ui/Reveal';
import { VisitInfo } from './sections/VisitInfo';
import { useLanguage } from '../../utils/languageContext';
import { getMockPost } from '../../utils/mockDataBilingual';

interface ActivityDetailPageProps {
  onNavigate: (page: string) => void;
  activity?: WPPost;
  slug?: string;
  backPage?: string;
}

export function ActivityDetailPage({ onNavigate, activity, slug, backPage }: ActivityDetailPageProps) {
  const { language, t } = useLanguage();
  const [postData, setPostData] = useState<WPPost | undefined>(activity);
  const [loading, setLoading] = useState(!activity && !!slug);
  const [error, setError] = useState(false);

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (activity) {
        setPostData(activity);
        setLoading(false);
        return;
    }
    
    if (slug) {
        setLoading(true);
        // Use bilingual mock data instead of API
        const data = getMockPost(slug, language);
        if (data) {
            setPostData(data);
            setLoading(false);
        } else {
            setError(true);
            setLoading(false);
        }
    }
  }, [activity, slug, language]);

  // Carousel logic (only if postData exists)
  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const scrollTo = (index: number) => api?.scrollTo(index);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans">{t('common.loading')}</div>;
  if (error || !postData) return <div className="min-h-screen flex items-center justify-center font-sans text-red-500">{language === 'th' ? 'ไม่พบกิจกรรม' : 'Activity not found.'}</div>;

  // Use gallery from postData or fallback to featured image
  const galleryImages = postData.gallery && postData.gallery.length > 0 
    ? postData.gallery 
    : (postData.featuredImage ? [postData.featuredImage.sourceUrl] : []);

  return (
    <div className="w-full bg-white min-h-screen pb-24">
      {/* Hero */}
      <div className="h-[35vh] md:h-[80vh] w-full relative overflow-hidden group bg-black">
         <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="w-full h-full"
            opts={{ align: "start", loop: true }}
         >
            <CarouselContent className="h-full -ml-0">
               {galleryImages.map((src, index) => (
                  <CarouselItem key={index} className="h-full pl-0">
                     <ImageWithFallback
                        src={src}
                        alt={`${postData.title} Gallery ${index + 1}`}
                        className="w-full h-full object-cover opacity-90"
                     />
                  </CarouselItem>
               ))}
            </CarouselContent>
            
            {galleryImages.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <CarouselPrevious className="pointer-events-auto static transform-none h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
                    <CarouselNext className="pointer-events-auto static transform-none h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
                </div>
            )}
         </Carousel>

         {/* Thumbnails */}
         {galleryImages.length > 1 && (
             <div className="absolute bottom-8 right-6 md:right-12 z-20 flex gap-2">
                {galleryImages.map((src, index) => (
                   <button
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={`w-16 h-10 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                         current === index 
                            ? 'border-white scale-105 shadow-lg' 
                            : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                   >
                      <ImageWithFallback
                         src={src}
                         alt={`Thumbnail ${index + 1}`}
                         className="w-full h-full object-cover"
                      />
                   </button>
                ))}
             </div>
         )}

         {/* Back Button */}
         <div className="absolute bottom-8 left-6 md:left-12 z-20">
            <button 
                onClick={() => onNavigate(backPage || 'activities')}
                className="fixed top-[120px] left-6 z-50 md:static flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium font-sans">
                    {backPage === 'archives' 
                        ? (language === 'th' ? 'กลับสู่คลังข้อมูล' : 'Back to Archives')
                        : (language === 'th' ? 'กลับสู่กิจกรรม' : 'Back to Activities')
                    }
                </span>
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-6 pt-[96px] pr-[24px] pb-24 md:pl-[48px]">
         <div className="flex flex-col md:flex-row">
            {/* Left Column */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
               <div className="md:sticky md:top-32">
                   <Reveal>
                       <div className="flex flex-col gap-1">
                           <h1 className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                              {postData.title}
                           </h1>

                           {postData.categories?.map((cat, idx) => (
                               <p key={idx} className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{cat}</p>
                           ))}
                           
                           {postData.date && (
                               <p className={`text-xl md:text-2xl text-black font-normal leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{postData.date}</p>
                           )}

                           <div className="mt-8">
                               <p className={`text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                   {language === 'th' ? 'ภัณฑารักษ์โดย' : 'Curated by'}
                               </p>
                               <p className={`text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>Stefano Rabolli Pansera</p>
                           </div>
                       </div>
                   </Reveal>
               </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2">
                <div className={`text-xl md:text-2xl text-black font-normal leading-tight space-y-6 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                   <Reveal delay={0.2}>
                       <div dangerouslySetInnerHTML={{ __html: postData.content }} />

                       {postData.acf?.schedule && (
                           <div>
                             <h3 className={`text-xl md:text-2xl font-normal mb-4 text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                 {language === 'th' ? 'ตารางกิจกรรม' : 'Schedule'}
                             </h3>
                             <div className={`space-y-2 text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                {postData.acf.schedule.map((item: any, idx: number) => (
                                    <p key={idx}><span className="font-bold">{item.title}</span> {item.details}</p>
                                ))}
                                {postData.acf.additionalContent && (
                                    <p className="mt-4 text-black">{postData.acf.additionalContent}</p>
                                )}
                             </div>
                           </div>
                       )}
                   </Reveal>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}