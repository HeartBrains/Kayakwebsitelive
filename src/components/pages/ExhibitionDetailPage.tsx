import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { WPPost } from '../../utils/types';
import { Reveal } from '../ui/Reveal';
import { VisitInfo } from './sections/VisitInfo';
import { useLanguage } from '../../utils/languageContext';
import { getMockPost } from '../../utils/mockDataBilingual';

interface ExhibitionDetailPageProps {
  onNavigate: (page: string) => void;
  exhibition?: WPPost;
  slug?: string;
  backPage?: string;
}

export function ExhibitionDetailPage({ onNavigate, exhibition, slug, backPage }: ExhibitionDetailPageProps) {
  const { language, t } = useLanguage();
  const [postData, setPostData] = useState<WPPost | undefined>(exhibition);
  const [loading, setLoading] = useState(!exhibition && !!slug);
  const [error, setError] = useState(false);

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (exhibition) {
        setPostData(exhibition);
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
  }, [exhibition, slug, language]);

  // Carousel logic
  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const scrollTo = (index: number) => api?.scrollTo(index);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans">{t('common.loading')}</div>;
  if (error || !postData) return <div className="min-h-screen flex items-center justify-center font-sans text-red-500">{language === 'th' ? 'ไม่พบนิทรรศการ' : 'Exhibition not found.'}</div>;

  // Use gallery from postData or fallback to featured image
  const baseGallery = postData.gallery && postData.gallery.length > 0 
    ? postData.gallery 
    : (postData.featuredImage ? [postData.featuredImage.sourceUrl] : []);

  // Use provided gallery images directly without random placeholders, as requested ("Only use photo in this")
  const galleryImages = baseGallery;

  return (
    <div className="w-full bg-white pb-24 min-h-screen">
       {/* Hero Section */}
       <div className="h-[35vh] md:h-[80vh] w-full relative overflow-hidden group bg-black">
         {galleryImages.length > 0 ? (
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
                            className="w-full h-full object-cover object-center opacity-90"
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
         ) : (
             <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">
                    {language === 'th' ? 'ไม่มีรูปภาพ' : 'No images available'}
                </span>
             </div>
         )}

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

         {/* Gradient Overlay */}
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

         {/* Back Button */}
         <div className="absolute bottom-8 left-6 md:left-12 z-20">
            <button 
                onClick={() => onNavigate(backPage || 'exhibitions')}
                className="fixed top-[120px] left-6 z-50 md:static flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium font-sans">
                    {backPage === 'archives' 
                        ? (language === 'th' ? 'กลับสู่คลังข้อมูล' : 'Back to Archives') 
                        : (language === 'th' ? 'กลับสู่นิทรรศการ' : 'Back to Exhibitions')
                    }
                </span>
            </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
            
            {/* Left Column - Meta Data */}
            <div className="md:col-span-4 flex flex-col gap-8 md:pl-[28px]">
                <Reveal>
                    <div className="flex flex-col gap-1">
                        <h1 className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {postData.title}
                        </h1>
                        
                        {postData.acf?.artist && (
                            <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                                {postData.acf.artist}
                            </p>
                        )}

                        {postData.date && (
                            <p className={`text-xl md:text-2xl text-black font-normal leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{postData.date}</p>
                        )}
                    </div>
                </Reveal>

                {/* Specifications */}
                {postData.acf?.specifications && (
                    <Reveal delay={0.1}>
                        <div className="flex flex-col gap-4 mt-4">
                            <h3 className="text-lg uppercase tracking-wider text-gray-500">Specifications</h3>
                            <div className="flex flex-col gap-2">
                                {Object.entries(postData.acf.specifications).map(([key, value]) => (
                                    <div key={key} className="flex flex-col">
                                        <span className="text-sm text-gray-400 capitalize">{key.replace(/_/g, ' ')}</span>
                                        <span className={`text-lg md:text-xl font-normal text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                )}

                {/* Tags */}
                {postData.acf?.tags && (
                    <Reveal delay={0.2}>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {postData.acf.tags.map((tag: string, idx: number) => (
                                <span key={idx} className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Reveal>
                )}
            </div>

            {/* Right Column - Text Content */}
            <div className={`md:col-span-8 text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                <Reveal delay={0.2}>
                    <div className="flex flex-col gap-6">
                        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
                    </div>
                </Reveal>
            </div>
        </div>
      </div>
    </div>
  );
}