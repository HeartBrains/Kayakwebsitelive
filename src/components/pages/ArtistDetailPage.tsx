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
import { Reveal } from '../ui/Reveal';
import { ARTISTS_DATA, ArtistDetail } from '../../utils/residencyData';
import { useLanguage } from '../../utils/languageContext';

interface ArtistDetailPageProps {
  onNavigate: (page: string) => void;
  slug?: string;
  backPage?: string;
}

export function ArtistDetailPage({ onNavigate, slug, backPage }: ArtistDetailPageProps) {
  const { language, t } = useLanguage();
  const [artist, setArtist] = useState<ArtistDetail | undefined>();
  const [loading, setLoading] = useState(true);

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slug) {
        const foundArtist = ARTISTS_DATA.find(a => a.slug === slug);
        setArtist(foundArtist);
    }
    setLoading(false);
  }, [slug]);

  // Carousel logic
  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const scrollTo = (index: number) => api?.scrollTo(index);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans">{t('common.loading')}</div>;
  if (!artist) return <div className="min-h-screen flex items-center justify-center font-sans text-red-500">{language === 'th' ? 'ไม่พบศิลปิน' : 'Artist not found.'}</div>;

  const displayName = language === 'th' ? artist.nameTH : artist.name;
  const displayPeriod = language === 'th' ? artist.periodTH : artist.period;
  const displayBio = language === 'th' ? artist.bioTH : artist.bio;
  const displayStatement = language === 'th' ? artist.statementTH : artist.statement;

  return (
    <div className="w-full bg-white pb-24 min-h-screen">
       {/* Hero Section */}
       <div className="h-[35vh] md:h-[80vh] w-full relative overflow-hidden group bg-black">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="w-full h-full"
            opts={{ align: "start", loop: true }}
            >
            <CarouselContent className="h-full -ml-0">
                {artist.gallery.map((src, index) => (
                    <CarouselItem key={index} className="h-full pl-0">
                        <ImageWithFallback
                        src={src}
                        alt={`${artist.name} Gallery ${index + 1}`}
                        className="w-full h-full object-cover opacity-90"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            
            {artist.gallery.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <CarouselPrevious className="pointer-events-auto static transform-none h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
                    <CarouselNext className="pointer-events-auto static transform-none h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
                </div>
            )}
            </Carousel>

         {/* Thumbnails */}
         {artist.gallery.length > 1 && (
             <div className="absolute bottom-8 right-6 md:right-12 z-20 flex gap-2">
                {artist.gallery.map((src, index) => (
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
                onClick={() => onNavigate('residency')}
                className="fixed top-[120px] left-6 z-50 md:static flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium font-sans">
                    {language === 'th' ? 'กลับสู่ศิลปินพำนัก' : 'Back to Residency'}
                </span>
            </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full px-6 py-12 md:py-16 md:pl-[48px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
            
            {/* Left Column - Meta Data */}
            <div className="md:col-span-6 flex flex-col gap-8">
                <Reveal>
                    <div className="flex flex-col gap-1">
                        <h1 className={`text-3xl md:text-5xl font-bold text-black leading-tight mb-4 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {displayName}
                        </h1>
                        <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {language === 'th' ? 'ศิลปินพำนัก' : 'Artist in Residence'}
                        </p>
                        <p className={`text-xl md:text-2xl text-gray-500 font-normal leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{displayPeriod}</p>
                    </div>
                </Reveal>
            </div>

            {/* Right Column - Text Content */}
            <div className={`md:col-span-6 text-xl md:text-2xl text-black font-normal leading-tight space-y-8 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                <Reveal delay={0.2}>
                    <div>
                        <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{language === 'th' ? 'ชีวประวัติ' : 'Biography'}</h3>
                        <p className={`text-lg md:text-xl text-gray-700 leading-relaxed ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {displayBio}
                        </p>
                    </div>
                </Reveal>
                <Reveal delay={0.4}>
                     <div>
                        <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{language === 'th' ? 'ถ้อยแถลงการพำนัก' : 'Residency Statement'}</h3>
                        <p className={`text-lg md:text-xl text-gray-700 leading-relaxed ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {displayStatement}
                        </p>
                    </div>
                </Reveal>
            </div>
        </div>
      </div>
    </div>
  );
}