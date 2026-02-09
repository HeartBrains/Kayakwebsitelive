import { useEffect, useRef } from 'react';
import { Reveal } from '../ui/Reveal';
import { ParallaxHero } from '../ui/ParallaxHero';
import { useLanguage } from '../../utils/languageContext';

export type AboutPageType = 'about' | 'vision' | 'history';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  activePage?: AboutPageType;
}

import { ABOUT_HERO_IMAGE } from '../../utils/mockDataBilingual';

export function AboutPage({ onNavigate, activePage = 'about' }: AboutPageProps) {
  const { language } = useLanguage();
  const isScrolling = useRef(false);

  // Handle auto-scroll to section
  useEffect(() => {
    if (activePage) {
        const el = document.getElementById(activePage);
        if (el) {
            setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    }
  }, [activePage]);

  const contentEN = [
    `Art Forrest is a new paradigm of institution whose name “SilaPaa” stems from two Thai words, Silapa and Paa meaning Art and Forest respectively, reflecting the institution’s ambition: advancing, supporting, and realising visionary proposals of artists in the natural environment.`,
    `Art Forrest enables artists to realise visionary projects within nature that may be unattainable due to scale or scope. It achieves this through commissioning single artist projects, organising exhibitions, creating site-specific installations, and collecting the work of Thai and International artists focusing on healing nature. To heal is to recover. Beyond the practice of well-being and more than the already established mindfulness activities in nature, Art Forrest recovers the lost possibilities, complexities, and vitalities of nature through the art of living, making, practising and thinking, not about but with nature.`,
    `From its inception, Art Forrest has shown a commitment to following and supporting artists' ideas that contribute to challenge and enrich the relationship with Nature. Through the Research and Public Programme such as talks, workshops, and symposiums, we share values, alter perspectives, and learn and unlearn together. Knowledge is exchanged across a wide range of ages, backgrounds, intellectual interests, disciplines, and nationalities in this transversal milieu.`,
    `Since its establishment, Art Forrest has been transforming the Khao Yai area into a vibrant arts destination for visitors from the region and internationally.`
  ];

  const contentTH = [
    `Art Forrest คือกระบวนทัศน์ใหม่ของสถาบันที่ชื่อว่า “ศิลปะป่า” มาจากคำไทยสองคำคือ ศิลปะ และ ป่า สะท้อนถึงความมุ่งมั่นของสถาบันในการผลักดัน สนับสนุน และทำให้ข้อเสนอที่มีวิสัยทัศน์ของศิลปินในสภาพแวดล้อมทางธรรมชาติเป็นจริง`,
    `Art Forrest ช่วยให้ศิลปินสามารถดำเนินโครงการที่มีวิสัยทัศน์ท่ามกลางธรรมชาติ ซึ่งอาจทำได้ยากเนื่องจากขนาดหรือขอบเขต โดยทำผ่านการว่าจ้างโครงการศิลปินเดี่ยว การจัดนิทรรศการ การสร้างสรรค์ผลงานศิลปะจัดวางเฉพาะพื้นที่ และการสะสมผลงานของศิลปินไทยและนานาชาติที่มุ่งเน้นการเยียวยาธรรมชาติ การเยียวยาคือการฟื้นฟู นอกเหนือจากการฝึกฝนเพื่อสุขภาวะและกิจกรรมการเจริญสติในธรรมชาติที่มีอยู่แล้ว Art Forrest ฟื้นฟูความเป็นไปได้ ความซับซ้อน และพลังชีวิตที่สูญหายไปของธรรมชาติ ผ่านศิลปะแห่งการใช้ชีวิต การสร้างสรรค์ การฝึกฝน และการคิด ไม่ใช่เกี่ยวกับธรรมชาติ แต่ร่วมกับธรรมชาติ`,
    `นับตั้งแต่ก่อตั้ง Art Forrest ได้แสดงความมุ่งมั่นในการติดตามและสนับสนุนความคิดของศิลปินที่มีส่วนช่วยท้าทายและเสริมสร้างความสัมพันธ์กับธรรมชาติ ผ่านโครงการวิจัยและสาธารณะ เช่น การเสวนา เวิร์กช็อป และการประชุมสัมมนา เราแบ่งปันค่านิยม ปรับเปลี่ยนมุมมอง เรียนรู้และละทิ้งความรู้เดิมร่วมกัน ความรู้จะถูกแลกเปลี่ยนข้ามช่วงวัย ภูมิหลัง ความสนใจทางปัญญา สาขาวิชา และสัญชาติในสภาพแวดล้อมที่หลากหลายนี้`,
    `นับตั้งแต่การก่อตั้ง Art Forrest ได้เปลี่ยนพื้นที่เขาใหญ่ให้เป็นจุดหมายปลายทางทางศิลปะที่มีชีวิตชีวาสำหรับผู้มาเยือนจากในภูมิภาคและระดับนานาชาติ`
  ];

  return (
    <div className="w-full min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <ParallaxHero 
        image={ABOUT_HERO_IMAGE}
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      </ParallaxHero>

      <div className="w-full px-6 pt-[96px] pr-[24px] pb-[0px] md:pl-[48px]">
        <section id="about" className="flex flex-col md:flex-row">
            {/* Left Column */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <Reveal>
                    <h2 className="text-xl md:text-2xl font-normal font-sans text-black leading-tight">
                        {language === 'th' ? 'เกี่ยวกับเรา' : 'About Us'}
                    </h2>
                </Reveal>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2">
                <div className="flex flex-col gap-8">
                    {contentEN.map((paragraph, index) => (
                        <Reveal key={`content-${index}`} delay={index * 0.1}>
                            <div className="flex flex-col gap-4">
                                {language !== 'th' && (
                                    <p className="text-xl md:text-2xl text-black font-normal leading-tight">
                                        {paragraph}
                                    </p>
                                )}
                                {language === 'th' && (
                                    <p className="text-xl md:text-2xl text-black font-normal font-sans leading-[1.82em]">
                                        {contentTH[index]}
                                    </p>
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
