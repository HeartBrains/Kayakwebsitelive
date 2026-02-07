import { WPPost } from './types';
import IMG_GOD_ASSET from 'figma:asset/333e45022861ad8d6b5f75dd9cb8b429f6dccc77.png';
import IMG_MUSIC_ON_THE_MOVE_ASSET from 'figma:asset/3aee81884c982f6a3494a9f241977094c9d2ef0f.png';

// New Image Assets (LIRP CDN)
const IMG_ABOUT_HERO = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Z44owZbqstJ99oRa_CopyofIMG_7215-1920w.jpeg";
const IMG_CONTACT_HERO = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/aGyt20MqNJQqHqMu__DSC9701-1920w.jpg";
const IMG_MADRID = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Z4XpjJbqstJ99aFF_Forest-Circle-II-01-1920w.jpg";
const IMG_MUSIC = IMG_MUSIC_ON_THE_MOVE_ASSET;
const IMG_FOG = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/aGywKEMqNJQqHqM-_KYAF_03-1920w.jpg";
const IMG_ARAYA = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Z44gkpbqstJ99oLq_Araya_1.2copy-1--1920w.jpg";
const IMG_MAMAN = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Z44UMpbqstJ99oDB_03Maman_PhotobyAndreaRossetti-1920w.jpg";
const IMG_KBAR = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Z44YyZbqstJ99oE8_03K-Bar_PhotobyAndreaRossetti-1920w.jpg";
const IMG_ARABICA = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Z44iuJbqstJ99oM__CopyofDSC001792.885100-1--1920w.jpg";
const IMG_PULSUS = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Z39x8ZbqstJ99M5I_Walking-In-Nature-1920w.jpeg";
const IMG_VISIT_HERO = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Z44I-5bqstJ99n62_202_0F4A8809-1920w.jpeg";
const IMG_TEAM_HERO = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/aXnw0AIvOtkhCBs8_A915147B-6743-45F3-8563-591E3EDF16B0-1920w.jpeg";
const IMG_GOD = IMG_GOD_ASSET;

// New Assets
const IMG_LIGHT = "https://images.unsplash.com/photo-1732038332358-c18d5dbaa068?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMGluc3RhbGxhdGlvbiUyMGZvcmVzdCUyMGFydHxlbnwxfHx8fDE3NzA0NzQyODV8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_CERAMIC = "https://images.unsplash.com/photo-1766802981812-5de4f231fc9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwYXJ0JTIwZXhoaWJpdGlvbiUyMG5hdHVyZXxlbnwxfHx8fDE3NzA0NzQyODR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_STAR = "https://images.unsplash.com/photo-1759774043517-906f3a1c9773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyZ2F6aW5nJTIwZXZlbnQlMjBuaWdodCUyMGZvcmVzdHxlbnwxfHx8fDE3NzA0NzQyODR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_POTTERY = "https://images.unsplash.com/photo-1767476106226-ff48f2e12286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwd29ya3Nob3AlMjBvdXRkb29yc3xlbnwxfHx8fDE3NzA0NzQyODV8MA&ixlib=rb-4.1.0&q=80&w=1080";

interface PostData {
    title: string;
    date: string;
    artist?: string;
    categories: string[];
    content: string;
    listing_summary?: string;
    extra?: any;
}

// Helper to create bilingual mock post
const createBilingualMockPost = (
  slug: string,
  type: 'exhibition' | 'activity' | 'post',
  image: string,
  en: PostData,
  th: PostData
): { en: WPPost; th: WPPost } => {
  return {
    en: {
      id: slug,
      slug,
      type,
      title: en.title,
      date: en.date,
      content: en.content,
      featuredImage: { sourceUrl: image, altText: en.title },
      categories: en.categories,
      acf: { 
          artist: en.artist, 
          curator: 'Stefano Rabolli Pansera', 
          listing_summary: en.listing_summary,
          ...en.extra 
      },
      gallery: [image]
    },
    th: {
      id: slug,
      slug,
      type,
      title: th.title,
      date: th.date,
      content: th.content,
      featuredImage: { sourceUrl: image, altText: th.title },
      categories: th.categories,
      acf: { 
          artist: th.artist, 
          curator: 'สเตฟาโน ราโบลลี พันเซรา', 
          listing_summary: th.listing_summary,
          ...th.extra 
      },
      gallery: [image]
    },
  };
};

export const MOCK_POSTS_BILINGUAL = {
  // --- Exhibitions (Current) ---
  'madrid-circle': createBilingualMockPost(
    'madrid-circle',
    'exhibition',
    IMG_MADRID,
    {
        title: 'Madrid Circle',
        date: 'Permanent',
        artist: 'Richard Long',
        categories: ['Land Art', 'Installation', 'Richard Long'],
        content: `<p>Richard Long transforms his journeys into works of art. The panoramic point of view over the rolling hills and canopy echoes limitless space. This Buddhist-inspired piece invites meditation on life as a succession of repetitive cycles, contrasting human 'earthling' time with the millions of years required for mineral formation.</p>`,
        listing_summary: "A perfect circle of slate slabs placed on a plateau delivering an interpretation of Infinity.",
        extra: {
            tags: ["Land Art", "Richard Long", "Slate Sculpture", "Minimalism", "Buddhist Art", "Infinity", "Outdoor Installation", "Contemporary Art", "Khao Yai Art", "Meditation"],
            specifications: { "material": "Slate slabs", "location": "High plateau overlook", "theme": "Geological vs Earthling time" }
        }
    },
    {
        title: 'Madrid Circle',
        date: 'ถาวร',
        artist: 'ริชาร์ด ลอง',
        categories: ['ศิลปะภูมิประเทศ', 'ศิลปะจัดวาง', 'ริชาร์ด ลอง'],
        content: `<p>ริชาร์ด ลอง เปลี่ยนการเดินทางของเขาให้กลายเป็นงานศิลปะ มุมมองแบบพาโนรามาเหนือเนินเขาและเรือนยอดไม้สะท้อนถึงพื้นที่อันไร้ขอบเขต ผลงานที่ได้รับแรงบันดาลใจจากพุทธศาสนานี้เชิญชวนให้ทำสมาธิเกี่ยวกับชีวิตในฐานะวัฏจักรที่ซ้ำแล้วซ้ำเล่า เปรียบเทียบเวลาของมนุษย์กับล้านปีที่จำเป็นสำหรับการก่อตัวของแร่ธาตุ</p>`,
        listing_summary: "วงกลมสมบูรณ์ของแผ่นหินชนวนที่วางอยู่บนที่ราบสูง สื่อถึงความเป็นอนันต์",
        extra: {
            tags: ["ศิลปะภูมิประเทศ", "ริชาร์ด ลอง", "ประติมากรรมหินชนวน", "มินิมอล", "ศิลปะพุทธ", "อนันต์", "ศิลปะจัดวางกลางแจ้ง", "ศิลปะร่วมสมัย", "ศิลปะเขาใหญ่", "การทำสมาธิ"],
            specifications: { "วัสดุ": "แผ่นหินชนวน", "สถานที่": "จุดชมวิวบนที่ราบสูง", "ธีม": "เวลาทางธรณีวิทยา vs เวลาของมนุษย์" }
        }
    }
  ),

  'khao-yai-fog-forrest': createBilingualMockPost(
    'khao-yai-fog-forrest',
    'exhibition',
    IMG_FOG,
    {
        title: 'Khao Yai Fog Forrest',
        date: 'Permanent (Activates 3x daily)',
        artist: 'Fujiko Nakaya',
        categories: ['Fog Sculpture', 'Installation', 'Fujiko Nakaya'],
        content: `<p>Known as 'Fog Landscape #48435', this work uses hundreds of hoses to create a massive amount of fog that slides down verdant grass slopes or is moved by the wind. The landscape was designed by Atsushi Kitagawara Architects. It questions the limits of what is seen and what is gone, utilizing an atmospheric water generator to remain sustainable by filtering water from humidity.</p>`,
        listing_summary: "A 'fog sculpture' that activates three times a day to produce an intense water mist.",
        extra: {
            tags: ["Fog Sculpture", "Fujiko Nakaya", "Interactive Art", "Japanese Artist", "Sustainable Art", "Landscape Architecture", "Atmospheric Art", "Immersive Experience", "Khao Yai Fog", "Eco-friendly"],
            specifications: { "duration": "20-minute intervals", "technology": "Atmospheric water generator", "architect": "Atsushi Kitagawara Architects" }
        }
    },
    {
        title: 'ป่าหมอกเขาใหญ่',
        date: 'ถาวร (ทำงาน 3 ครั้งต่อวัน)',
        artist: 'ฟูจิโกะ นากายะ',
        categories: ['ประติมากรรมหมอก', 'ศิลปะจัดวาง', 'ฟูจิโกะ นากายะ'],
        content: `<p>เป็นที่รู้จักในชื่อ 'Fog Landscape #48435' ผลงานชิ้นนี้ใช้ท่อหลายร้อยท่อเพื่อสร้างหมอกจำนวนมหาศาลที่เลื่อนไหลลงมาตามเนินหญ้าสีเขียวหรือเคลื่อนไหวไปตามลม ภูมิทัศน์ได้รับการออกแบบโดย Atsushi Kitagawara Architects ผลงานนี้ตั้งคำถามถึงขอบเขตของสิ่งที่มองเห็นและสิ่งที่หายไป โดยใช้เครื่องกำเนิดน้ำจากบรรยากาศเพื่อความยั่งยืนด้วยการกรองน้ำจากความชื้น</p>`,
        listing_summary: "ประติมากรรมหมอกที่จะทำงานสามครั้งต่อวันเพื่อสร้างละอองน้ำหนาทึบ",
        extra: {
            tags: ["ประติมากรรมหมอก", "ฟูจิโกะ นากายะ", "ศิลปะเชิงโต้ตอบ", "ศิลปินญี่ปุ่น", "ศิลปะยั่งยืน", "สถาปัตยกรรมภูมิทัศน์", "ศิลปะบรรยากาศ", "ประสบการณ์ดื่มด่ำ", "หมอกเขาใหญ่", "เป็นมิตรกับสิ่งแวดล้อม"],
            specifications: { "ระยะเวลา": "ช่วงละ 20 นาที", "เทคโนโลยี": "เครื่องกำเนิดน้ำจากบรรยากาศ", "สถาปนิก": "Atsushi Kitagawara Architects" }
        }
    }
  ),

  'god': createBilingualMockPost(
    'god',
    'exhibition',
    IMG_GOD,
    {
        title: 'GOD',
        date: 'Permanent',
        artist: 'Francesco Arena',
        categories: ['Sculpture', 'Conceptual', 'Francesco Arena'],
        content: `<p>Consisting of two large limestone stones, the letters G and D are carved into one, while O is carved into the other. The word is completed only when the stones are joined, at which point the word becomes invisible to the public. It reflects the concept of the divine as heavy, full, and yet unseen.</p>`,
        listing_summary: "A conceptual sculpture where the word 'GOD' becomes hidden inside stone.",
        extra: {
            tags: ["Francesco Arena", "Conceptual Art", "Limestone Sculpture", "Italian Artist", "Minimalist Art", "Divine Concept", "Public Art", "Site Specific", "Sculpture", "Abstract Art"],
            specifications: { "material": "Limestone", "concept": "Invisible divinity", "installation": "Forrest floor" }
        }
    },
    {
        title: 'GOD',
        date: 'ถาวร',
        artist: 'ฟรานเชสโก อารีนา',
        categories: ['ประติมากรรม', 'ศิลปะเชิงแนวคิด', 'ฟรานเชสโก อารีนา'],
        content: `<p>ประกอบด้วยหินปูนขนาดใหญ่สองก้อน อักษร G และ D ถูกแกะสลักไว้ในก้อนหนึ่ง ในขณะที่ O ถูกแกะสลักไว้ในอีกก้อนหนึ่ง คำนี้จะสมบูรณ์ก็ต่อเมื่อนำหินมาประกบกัน ซึ่ง ณ จุดนั้นคำว่า GOD จะไม่สามารถมองเห็นได้โดยสาธารณชน สะท้อนถึงแนวคิดเกี่ยวกับความเป็นเทพเจ้าที่หนักแน่น เต็มเปี่ยม แต่กลับมองไม่เห็น</p>`,
        listing_summary: "ประติมากรรมเชิงแนวคิดที่คำว่า 'GOD' ถูกซ่อนอยู่ในหิน",
        extra: {
            tags: ["ฟรานเชสโก อารีนา", "ศิลปะเชิงแนวคิด", "ประติมากรรมหินปูน", "ศิลปินอิตาลี", "ศิลปะมินิมอล", "แนวคิดเกี่ยวกับเทพเจ้า", "ศิลปะสาธารณะ", "เฉพาะพื้นที่", "ประติมากรรม", "ศิลปะนามธรรม"],
            specifications: { "วัสดุ": "หินปูน", "แนวคิด": "ความเป็นเทพเจ้าที่มองไม่เห็น", "การติดตั้ง": "พื้นป่า" }
        }
    }
  ),

  'two-planets-series': createBilingualMockPost(
    'two-planets-series',
    'exhibition',
    IMG_ARAYA,
    {
        title: 'Two Planets Series',
        date: 'Permanent',
        artist: 'Araya Rasdjarmrearnsook',
        categories: ['Video Installation', 'Social', 'Araya Rasdjarmrearnsook'],
        content: `<p>Araya Rasdjarmrearnsook presents videos where local Thai farmers, workers, and monks react to works like Manet’s 'Le Déjeuner sur l'herbe'. The installation displaces the object of attention through a 'mise en abyme', questioning the visitor's own voyeurism and the perception of art through an unformatted point of view.</p>`,
        listing_summary: "Video installations showing reactions of locals to reproductions of worldwide masterpieces.",
        extra: {
            tags: ["Araya Rasdjarmrearnsook", "Video Art", "Thai Contemporary Art", "Mise en Abyme", "Cultural Dialogue", "Masterpiece Parody", "Social Experiment", "Art Film", "Southeast Asian Art", "Digital Media"],
            specifications: { "medium": "Video installation", "featured_works": ["Manet", "Millet"], "location": "Outdoor screening in forrest" }
        }
    },
    {
        title: 'ชุดผลงาน Two Planets',
        date: 'ถาวร',
        artist: 'อารยา ราษฎร์จำเริญสุข',
        categories: ['วิดีโอจัดวาง', 'สังคม', 'อารยา ราษฎร์จำเริญสุข'],
        content: `<p>อารยา ราษฎร์จำเริญสุข นำเสนอวิดีโอที่เกษตรกรไทย คนงาน และพระสงฆ์ แสดงปฏิกิริยาต่อผลงานศิลปะระดับโลก เช่น 'Le Déjeuner sur l'herbe' ของมาเนต์ ผลงานนี้ย้ายจุดสนใจผ่านการซ้อนภาพ (mise en abyme) ตั้งคำถามถึงการถ้ำมองของผู้ชมและการรับรู้ศิลปะผ่านมุมมองที่ไม่ได้ถูกจัดรูปแบบ</p>`,
        listing_summary: "วิดีโอจัดวางที่แสดงปฏิกิริยาของชาวบ้านต่อผลงานศิลปะระดับโลก",
        extra: {
            tags: ["อารยา ราษฎร์จำเริญสุข", "วิดีโออาร์ต", "ศิลปะร่วมสมัยไทย", "Mise en Abyme", "บทสนทนาทางวัฒนธรรม", "ล้อเลียนงานมาสเตอร์พีซ", "การทดลองทางสังคม", "ภาพยนตร์ศิลปะ", "ศิลปะเอเชียตะวันออกเฉียงใต้", "สื่อดิจิทัล"],
            specifications: { "สื่อ": "วิดีโอจัดวาง", "ผลงานที่นำเสนอ": ["Manet", "Millet"], "สถานที่": "การฉายภาพกลางแจ้งในป่า" }
        }
    }
  ),

  'pulsus-vitae': createBilingualMockPost(
    'pulsus-vitae',
    'exhibition',
    IMG_PULSUS,
    {
        title: 'Pulsus Vitae',
        date: 'Permanent',
        artist: 'Scenocosme',
        categories: ['Interactive', 'Sound', 'Bio-feedback'],
        content: `<p>This interactive bio-feedback work allows visitors to touch or lean against a living tree to feel sonorous vibrations synchronized with a human heartbeat. It creates a sensory dialogue between the human body and the forrest, emphasizing the shared 'pulse' of life.</p>`,
        listing_summary: "A sound installation that features a living tree acting as a bridge between earth and sky.",
        extra: {
            tags: ["Bio-feedback", "Interactive Sound", "Nature Art", "Heartbeat Sync", "Digital Arts", "Environmental Art", "Sensory Experience", "Bio-Art", "Forrest Healing", "Technological Art"],
            specifications: { "medium": "Bio-feedback / Sound", "interaction": "Tactile / Auditory", "theme": "Interconnectivity" }
        }
    },
    {
        title: 'Pulsus Vitae',
        date: 'ถาวร',
        artist: 'Scenocosme',
        categories: ['ศิลปะเชิงโต้ตอบ', 'เสียง', 'การตอบสนองทางชีวภาพ'],
        content: `<p>ผลงานศิลปะเชิงโต้ตอบแบบไบโอฟีดแบ็คนี้ให้ผู้เข้าชมสัมผัสหรือพิงต้นไม้ที่มีชีวิตเพื่อรู้สึกถึงการสั่นสะเทือนของเสียงที่ประสานกับจังหวะการเต้นของหัวใจมนุษย์ สร้างบทสนทนาทางประสาทสัมผัสระหว่างร่างกายมนุษย์และผืนป่า เน้นย้ำถึง 'ชีพจร' แห่งชีวิตที่ใช้ร่วมกัน</p>`,
        listing_summary: "ศิลปะจัดวางเสียงที่มีต้นไม้มีชีวิตทำหน้าที่เป็นสะพานเชื่อมระหว่างโลกและท้องฟ้า",
        extra: {
            tags: ["ไบโอฟีดแบ็ค", "เสียงเชิงโต้ตอบ", "ศิลปะธรรมชาติ", "การประสานจังหวะหัวใจ", "ศิลปะดิจิทัล", "ศิลปะสิ่งแวดล้อม", "ประสบการณ์ทางประสาทสัมผัส", "Bio-Art", "การบำบัดด้วยป่า", "ศิลปะเทคโนโลยี"],
            specifications: { "สื่อ": "ไบโอฟีดแบ็ค / เสียง", "การโต้ตอบ": "การสัมผัส / การได้ยิน", "ธีม": "ความเชื่อมโยงระหว่างกัน" }
        }
    }
  ),

  // --- Exhibitions (Past) ---
  'maman': createBilingualMockPost(
    'maman',
    'exhibition',
    IMG_MAMAN,
    {
        title: 'Maman',
        date: 'Past Exhibition',
        artist: 'Louise Bourgeois',
        categories: ['Sculpture', 'Monumental', 'Louise Bourgeois'],
        content: `<p>Standing over 30 feet tall, Maman symbolizes the artist's mother, a weaver and restorer. In the context of Khao Yai, the spider represents a maternal attitude of reparation—weaving and healing our relationship with nature, which is described as both our mother and our home.</p>`,
        listing_summary: "The iconic monumental spider sculpture symbolizing the artist's mother.",
        extra: {
            tags: ["Louise Bourgeois", "Maman Sculpture", "Spider Art", "Bronze Sculpture", "Feminist Art", "Iconic Art", "Public Installation", "Maternal Theme", "Modern Art", "Pak Chong Art"],
            specifications: { "material": "Bronze, stainless steel, marble", "height": "9 meters", "location": "Entrance area (Public access)" }
        }
    },
    {
        title: 'Maman',
        date: 'นิทรรศการที่ผ่านมา',
        artist: 'หลุยส์ บูร์ชัวส์',
        categories: ['ประติมากรรม', 'ขนาดใหญ่', 'หลุยส์ บูร์ชัวส์'],
        content: `<p>ด้วยความสูงกว่า 30 ฟุต Maman เป็นสัญลักษณ์ของแม่ของศิลปิน ซึ่งเป็นช่างทอผ้าและนักซ่อมแซม ในบริบทของเขาใหญ่ แมงมุมสื่อถึงทัศนคติความเป็นแม่ในการซ่อมแซม—การถักทอและเยียวยาความสัมพันธ์ของเรากับธรรมชาติ ซึ่งถูกอธิบายว่าเป็นทั้งแม่และบ้านของเรา</p>`,
        listing_summary: "ประติมากรรมแมงมุมขนาดใหญ่ที่เป็นสัญลักษณ์ สื่อถึงแม่ของศิลปิน",
        extra: {
            tags: ["หลุยส์ บูร์ชัวส์", "ประติมากรรม Maman", "ศิลปะแมงมุม", "ประติมากรรมสำริด", "ศิลปะสตรีนิยม", "ศิลปะที่เป็นสัญลักษณ์", "ศิลปะจัดวางสาธารณะ", "ธีมความเป็นแม่", "ศิลปะสมัยใหม่", "ศิลปะปากช่อง"],
            specifications: { "วัสดุ": "สำริด, สแตนเลส, หินอ่อน", "ความสูง": "9 เมตร", "สถานที่": "บริเวณทางเข้า (เข้าชมได้ทั่วไป)" }
        }
    }
  ),

  'light-shadow-2025': createBilingualMockPost(
    'light-shadow-2025',
    'exhibition',
    IMG_LIGHT,
    {
        title: 'Light & Shadow',
        date: 'Past Exhibition (Nov 2025)',
        artist: 'Elena Vora',
        categories: ['Installation', 'Light Art', 'Site-Specific'],
        content: `<p>Using projection mapping and LED structures, Elena Vora engaged with the natural topography of the forrest at night. The work questioned our perception of darkness and safety in nature, turning the forrest into a canvas of shifting constellations.</p>`,
        listing_summary: "An immersive light installation that transformed the forrest into a luminous dreamscape.",
        extra: {
            tags: ["Light Art", "Elena Vora", "Night Exhibition", "Projection Mapping", "Forrest Art", "Immersive", "Site-specific"],
            specifications: { "technology": "LED & Projection", "duration": "Nightly 18:00 - 22:00", "location": "Bamboo Grove" }
        }
    },
    {
        title: 'แสงและเงา (Light & Shadow)',
        date: 'นิทรรศการที่ผ่านมา (พ.ย. 2025)',
        artist: 'เอเลนา โวรา',
        categories: ['ศิลปะจัดวาง', 'ศิลปะแสง', 'เฉพาะพื้นที่'],
        content: `<p>เอเลนา โวรา ใช้การฉายภาพและโครงสร้าง LED เพื่อโต้ตอบกับภูมิประเทศตามธรรมชาติของป่าในเวลากลางคืน ผลงานนี้ตั้งคำถามถึงการรับรู้ของเราเกี่ยวกับความมืดและความปลอดภัยในธรรมชาติ โดยเปลี่ยนผืนป่าให้กลายเป็นผืนผ้าใบของกลุ่มดาวที่เคลื่อนไหว</p>`,
        listing_summary: "ศิลปะจัดวางแสงแบบอิมเมอร์ซีฟที่เปลี่ยนผืนป่าให้กลายเป็นดินแดนแห่งความฝันอันสว่างไสว",
        extra: {
            tags: ["ศิลปะแสง", "เอเลนา โวรา", "นิทรรศการกลางคืน", "Projection Mapping", "ศิลปะป่า", "Immersive", "เฉพาะพื้นที่"],
            specifications: { "เทคโนโลยี": "LED และการฉายภาพ", "ระยะเวลา": "ทุกคืน 18:00 - 22:00", "สถานที่": "สวนไผ่" }
        }
    }
  ),

  'earth-tones-2025': createBilingualMockPost(
    'earth-tones-2025',
    'exhibition',
    IMG_CERAMIC,
    {
        title: 'Earth Tones',
        date: 'Past Exhibition (Oct 2025)',
        artist: 'Somsak Chai',
        categories: ['Ceramics', 'Sculpture', 'Nature'],
        content: `<p>Somsak Chai's work explores the resilience of clay when exposed to extreme elements. These large-scale vessels were created using local soil and fired on-site, bearing the scorch marks of the process as a testament to the relationship between earth and fire.</p>`,
        listing_summary: "A collection of ceramic sculptures fired in open pits, reflecting the raw elements of nature.",
        extra: {
            tags: ["Ceramics", "Somsak Chai", "Clay Art", "Natural Materials", "Sculpture", "Thai Artist", "Process Art"],
            specifications: { "material": "Local Clay", "technique": "Pit Firing", "location": "Open Field" }
        }
    },
    {
        title: 'เอิร์ธโทน (Earth Tones)',
        date: 'นิทรรศการที่ผ่านมา (ต.ค. 2025)',
        artist: 'สมศักดิ์ ชัย',
        categories: ['เซรามิก', 'ประติมากรรม', 'ธรรมชาติ'],
        content: `<p>ผลงานของสมศักดิ์ ชัย สำรวจความทนทานของดินเหนียวเมื่อต้องเผชิญกับสภาวะสุดขั้ว ภาชนะขนาดใหญ่เหล่านี้สร้างขึ้นโดยใช้ดินในท้องถิ่นและเผาในสถานที่จริง ร่องรอยการเผาไหม้บนชิ้นงานเป็นเครื่องยืนยันถึงความสัมพันธ์ระหว่างดินและไฟ</p>`,
        listing_summary: "คอลเลกชันประติมากรรมเซรามิกที่ผ่านการเผาในหลุมเปิด สะท้อนถึงธาตุแท้ของธรรมชาติ",
        extra: {
            tags: ["เซรามิก", "สมศักดิ์ ชัย", "ศิลปะดินเหนียว", "วัสดุธรรมชาติ", "ประติมากรรม", "ศิลปินไทย", "Process Art"],
            specifications: { "วัสดุ": "ดินท้องถิ่น", "เทคนิค": "การเผาแบบหลุม", "สถานที่": "ลานกลางแจ้ง" }
        }
    }
  ),

  // --- Activities (Current) ---
  'k-bar-experience': createBilingualMockPost(
    'k-bar-experience',
    'activity',
    IMG_KBAR,
    {
        title: 'K-BAR Experience',
        date: 'Every second Saturday of each month',
        artist: 'Elmgreen & Dragset',
        categories: ['Event', 'Social', 'Gastronomy'],
        content: `<p>A hidden, intimate bar offering a special drink menu by artists Elmgreen & Dragset. Features professional mixology from Ku Bar and a mid-century interior inspired by Martin Kippenberger.</p>`,
        listing_summary: "A hidden, intimate bar offering a special drink menu by artists Elmgreen & Dragset.",
        extra: {
            tags: ["K-BAR", "Elmgreen & Dragset", "Cocktail Experience", "Hidden Bar", "Art Events", "Khao Yai Nightlife", "VIP Experience", "Social Gathering", "Artist Design", "Exclusive Event"]
        }
    },
    {
        title: 'K-BAR Experience',
        date: 'ทุกวันเสาร์ที่สองของเดือน',
        artist: 'เอล์มกรีน และ แดร็กเซ็ต',
        categories: ['กิจกรรม', 'สังคม', 'อาหารและเครื่องดื่ม'],
        content: `<p>บาร์ลับบรรยากาศเป็นกันเองที่นำเสนอเมนูเครื่องดื่มพิเศษโดยศิลปิน เอล์มกรีน และ แดร็กเซ็ต ให้บริการมิกซ์โซโลจีระดับมืออาชีพจาก Ku Bar และการตกแต่งภายในสไตล์ Mid-century ที่ได้รับแรงบันดาลใจจาก Martin Kippenberger</p>`,
        listing_summary: "บาร์ลับบรรยากาศเป็นกันเองที่นำเสนอเมนูเครื่องดื่มพิเศษโดยศิลปิน",
        extra: {
            tags: ["K-BAR", "Elmgreen & Dragset", "ประสบการณ์ค็อกเทล", "บาร์ลับ", "กิจกรรมศิลปะ", "ไนท์ไลฟ์เขาใหญ่", "VIP", "การพบปะสังสรรค์", "การออกแบบโดยศิลปิน", "กิจกรรมพิเศษ"]
        }
    }
  ),

  // --- Activities (Past) ---
  'music-on-the-move-2025': createBilingualMockPost(
    'music-on-the-move-2025',
    'activity',
    IMG_MUSIC,
    {
        title: 'Music on the Move 2025',
        date: 'July 19, 2025',
        categories: ['Concert', 'Collaboration', 'Music'],
        content: `<p>A musical experience combining art and nature, held in collaboration with the Princess Galyani Vadhana Institute of Music (PGVIM).</p>`,
        extra: {
            tags: ["PGVIM", "Classical Music", "Live Music", "Nature Concert", "Musical Collaboration", "Khao Yai Events", "Outdoor Performance", "Art & Music", "Educational Event", "Acoustics"],
            type_label: "Concert / Collaboration"
        }
    },
    {
        title: 'Music on the Move 2568',
        date: '19 กรกฎาคม 2025',
        categories: ['คอนเสิร์ต', 'ความร่วมมือ', 'ดนตรี'],
        content: `<p>ประสบการณ์ทางดนตรีที่ผสมผสานศิลปะและธรรมชาติ จัดขึ้นโดยความร่วมมือกับสถาบันดนตรีกัลยาณิวัฒนา (PGVIM)</p>`,
        extra: {
            tags: ["PGVIM", "ดนตรีคลาสสิก", "ดนตรีสด", "คอนเสิร์ตในธรรมชาติ", "ความร่วมมือทางดนตรี", "กิจกรรมเขาใหญ่", "การแสดงกลางแจ้ง", "ศิลปะและดนตรี", "กิจกรรมการศึกษา", "อคูสติก"],
            type_label: "คอนเสิร์ต / ความร่วมมือ"
        }
    }
  ),

  'arabica-popup': createBilingualMockPost(
    'arabica-popup',
    'activity',
    IMG_ARABICA,
    {
        title: '% Arabica Popup',
        date: 'Closed mid-August 2025',
        categories: ['Charity', 'Pop-up', 'Gastronomy'],
        content: `<p>A pop-up coffee experience where 100% of the profits were dedicated to building schools and supporting local education in Khao Yai.</p>`,
        listing_summary: "A pop-up coffee experience where 100% of the profits were dedicated to building schools and supporting local education in Khao Yai.",
        extra: {
            tags: ["% Arabica", "Coffee Popup", "Charity Event", "Social Impact", "Khao Yai Cafe", "Educational Support", "Community Project", "Non-profit", "Boutique Coffee", "Art & Coffee"],
            type_label: "Charity Pop-up"
        }
    },
    {
        title: '% Arabica ป๊อปอัพ',
        date: 'ปิดให้บริการกลางเดือนสิงหาคม 2025',
        categories: ['การกุศล', 'ป๊อปอัพ', 'อาหารและเครื่องดื่ม'],
        content: `<p>ประสบการณ์กาแฟป๊อปอัพที่รายได้ 100% มอบให้กับการสร้างโรงเรียนและสนับสนุนการศึกษาในท้องถิ่นที่เขาใหญ่</p>`,
        listing_summary: "ประสบการณ์กาแฟป๊อปอัพที่รายได้ 100% มอบให้กับการสร้างโรงเรียนและสนับสนุนการศึกษาในท้องถิ่นที่เขาใหญ่",
        extra: {
            tags: ["% Arabica", "กาแฟป๊อปอัพ", "กิจกรรมการกุศล", "ผลกระทบทางสังคม", "คาเฟ่เขาใหญ่", "สนับสนุนการศึกษา", "โครงการชุมชน", "ไม่แสวงหากำไร", "กาแฟบูติก", "ศิลปะและกาแฟ"],
            type_label: "ป๊อปอัพการกุศล"
        }
    }
  ),

  'star-gazing-2025': createBilingualMockPost(
    'star-gazing-2025',
    'activity',
    IMG_STAR,
    {
        title: 'Star Gazing Night',
        date: 'December 15, 2025',
        categories: ['Nature', 'Education', 'Night Event'],
        content: `<p>A guided tour of the winter sky. Visitors joined astronomers to observe constellations, planets, and deep-sky objects from the light-pollution-free zone of the Art Forrest.</p>`,
        listing_summary: "Guided tour of the winter sky, observing constellations and planets.",
        extra: {
            tags: ["Astronomy", "Night Sky", "Stargazing", "Nature Tour", "Education", "Family Event", "Khao Yai Night"],
            type_label: "Guided Tour"
        }
    },
    {
        title: 'คืนดูดาว (Star Gazing Night)',
        date: '15 ธันวาคม 2025',
        categories: ['ธรรมชาติ', 'การศึกษา', 'กิจกรรมกลางคืน'],
        content: `<p>ทัวร์ชมท้องฟ้าฤดูหนาวพร้อมวิทยากร ผู้เข้าชมได้ร่วมสังเกตกลุ่มดาว ดาวเคราะห์ และวัตถุท้องฟ้าจากเขตปลอดมลภาวะทางแสงของ Art Forrest</p>`,
        listing_summary: "ทัวร์ชมท้องฟ้าฤดูหนาว สังเกตกลุ่มดาวและดาวเคราะห์",
        extra: {
            tags: ["ดาราศาสตร์", "ท้องฟ้ายามค่ำคืน", "ดูดาว", "ทัวร์ธรรมชาติ", "การศึกษา", "กิจกรรมครอบครัว", "ค่ำคืนเขาใหญ่"],
            type_label: "ทัวร์นำชม"
        }
    }
  ),

  'ceramic-workshop-2025': createBilingualMockPost(
    'ceramic-workshop-2025',
    'activity',
    IMG_POTTERY,
    {
        title: 'Open Air Pottery',
        date: 'November 20, 2025',
        categories: ['Workshop', 'Craft', 'Education'],
        content: `<p>Hands-on pottery workshop led by local artisans. Participants learned hand-building techniques using clay harvested from the surrounding hills.</p>`,
        listing_summary: "Hands-on pottery workshop led by local artisans.",
        extra: {
            tags: ["Pottery", "Workshop", "Craft", "Hand-building", "Local Art", "Education", "Interactive"],
            type_label: "Workshop"
        }
    },
    {
        title: 'เครื่องปั้นดินเผากลางแจ้ง',
        date: '20 พฤศจิกายน 2025',
        categories: ['เวิร์กช็อป', 'งานฝีมือ', 'การศึกษา'],
        content: `<p>เวิร์กช็อปเครื่องปั้นดินเผาลงมือทำจริงโดยช่างฝีมือท้องถิ่น ผู้เข้าร่วมได้เรียนรู้เทคนิคการปั้นด้วยมือโดยใช้ดินเหนียวที่เก็บมาจากเนินเขาโดยรอบ</p>`,
        listing_summary: "เวิร์กช็อปเครื่องปั้นดินเผาลงมือทำจริงโดยช่างฝีมือท้องถิ่น",
        extra: {
            tags: ["เครื่องปั้นดินเผา", "เวิร์กช็อป", "งานฝีมือ", "ปั้นมือ", "ศิลปะท้องถิ่น", "การศึกษา", "เชิงโต้ตอบ"],
            type_label: "เวิร์กช็อป"
        }
    }
  )
};

export const getMockPost = (slug: string, language: 'en' | 'th' = 'en'): WPPost | undefined => {
  const post = MOCK_POSTS_BILINGUAL[slug as keyof typeof MOCK_POSTS_BILINGUAL];
  if (!post) return undefined;
  return post[language];
};

export const getMockPostsByType = (type: 'exhibition' | 'activity' | 'post', language: 'en' | 'th' = 'en'): WPPost[] => {
  return Object.values(MOCK_POSTS_BILINGUAL)
    .map(post => post[language])
    .filter(post => post.type === type);
};

// Export these for use in Page Components
export const ACTIVITY_HERO_IMAGE = IMG_KBAR;
export const ABOUT_HERO_IMAGE = IMG_ABOUT_HERO;
export const CONTACT_HERO_IMAGE = IMG_CONTACT_HERO;
export const VISIT_HERO_IMAGE = IMG_VISIT_HERO;
export const TEAM_HERO_IMAGE = IMG_TEAM_HERO;
export const EXHIBITIONS_HERO_IMAGE = IMG_MADRID;

export const IMG_MADRID_SRC = IMG_MADRID;
export const IMG_FOG_SRC = IMG_FOG;
export const IMG_GOD_SRC = IMG_GOD;
export const IMG_ARAYA_SRC = IMG_ARAYA;
export const IMG_PULSUS_SRC = IMG_PULSUS;
export const IMG_MAMAN_SRC = IMG_MAMAN;
export const IMG_KBAR_SRC = IMG_KBAR;
export const IMG_MUSIC_SRC = IMG_MUSIC;
export const IMG_ARABICA_SRC = IMG_ARABICA;
