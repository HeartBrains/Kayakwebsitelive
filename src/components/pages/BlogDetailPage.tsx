import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WPPost } from '../../utils/types';
import { ParallaxHero } from '../ui/ParallaxHero';
import { Reveal } from '../ui/Reveal';
import { useLanguage } from '../../utils/languageContext';
import { getMockPost } from '../../utils/mockDataBilingual';

interface BlogDetailPageProps {
  onNavigate: (page: string) => void;
  post?: WPPost;
  slug?: string;
}

export function BlogDetailPage({ onNavigate, post, slug }: BlogDetailPageProps) {
  const { language, t } = useLanguage();
  const [postData, setPostData] = useState<WPPost | undefined>(post);
  const [loading, setLoading] = useState(!post && !!slug);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (post) {
        setPostData(post);
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
  }, [post, slug, language]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans">{t('common.loading')}</div>;
  if (error || !postData) return <div className="min-h-screen flex items-center justify-center font-sans text-red-500">{language === 'th' ? 'ไม่พบบทความ' : 'Post not found.'}</div>;

  return (
    <div className="w-full bg-white min-h-screen pb-24">
      {/* Hero */}
      {postData.featuredImage ? (
         <ParallaxHero 
            image={postData.featuredImage.sourceUrl} 
            height="h-[35vh] md:h-[80vh]"
         >
             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
             <div className="absolute bottom-8 left-6 md:left-12 z-20">
                <button 
                    onClick={() => onNavigate('blog')}
                    className="fixed top-[120px] left-6 z-50 md:static flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm font-medium font-sans">{language === 'th' ? 'กลับไปบล็อก' : 'Back to Blog'}</span>
                </button>
            </div>
         </ParallaxHero>
      ) : (
         <div className="h-[20vh] bg-gray-100 w-full relative">
            <div className="absolute bottom-8 left-6 md:left-12 z-20">
                <button 
                    onClick={() => onNavigate('blog')}
                    className="fixed top-[120px] left-6 z-50 md:static flex items-center gap-2 text-black hover:text-gray-600 transition-colors bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm font-medium font-sans">{language === 'th' ? 'กลับไปบล็อก' : 'Back to Blog'}</span>
                </button>
            </div>
         </div>
      )}

      {/* Content */}
      <div className="w-full px-6 py-12 md:py-16">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
            {/* Left Column */}
            <div className="md:col-span-5 flex flex-col gap-8">
               <Reveal>
                    <div className="flex flex-col gap-1">
                        <h1 className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {postData.title}
                        </h1>

                        {postData.categories && (
                            <>
                                {postData.categories.map((cat, idx) => (
                                    <p key={idx} className={`text-xl md:text-2xl font-normal text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{cat}</p>
                                ))}
                            </>
                        )}

                        {postData.date && (
                            <p className={`text-xl md:text-2xl text-black font-normal leading-tight mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>{postData.date}</p>
                        )}
                    </div>
               </Reveal>
            </div>

            {/* Right Column */}
            <div className={`md:col-start-6 md:col-span-7 text-xl md:text-2xl text-black font-normal leading-tight space-y-6 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
               <Reveal delay={0.2}>
                   <div dangerouslySetInnerHTML={{ __html: postData.content }} />
               </Reveal>

               {postData.acf?.keyThemes && (
                   <Reveal delay={0.3}>
                       <div>
                         <h3 className={`text-xl md:text-2xl font-normal mb-4 text-black leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {language === 'th' ? 'หัวข้อหลัก' : 'Key Themes'}
                         </h3>
                         <div className={`space-y-2 text-xl md:text-2xl text-black font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                            {postData.acf.keyThemes.map((item: any, idx: number) => (
                                 <p key={idx}><span className="font-bold">{item.title}:</span> {item.desc}</p>
                            ))}
                         </div>
                       </div>
                   </Reveal>
               )}

               <Reveal delay={0.4}>
                   <p className={`text-xl md:text-2xl text-gray-500 font-normal leading-tight ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                     {language === 'th' 
                        ? 'เข้าร่วมการเสวนาและเวิร์คช็อปประจำเดือนของเราเพื่อเจาะลึกหัวข้อเหล่านี้กับศิลปินและภัณฑารักษ์ที่โดดเด่นของเรา'
                        : 'Join us for our monthly talks and workshops to dive deeper into these topics with our featured artists and curators.'
                     }
                   </p>
               </Reveal>
            </div>
         </div>
      </div>
    </div>
  );
}