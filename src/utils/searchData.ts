import { MOCK_POSTS_BILINGUAL } from './mockDataBilingual';
import { RECORDS } from './records';
import { ARTISTS_DATA } from './residencyData';
import { translations } from './translations';

export interface SearchDocument {
  id: string;
  title: string;
  content: string;
  keywords: string;
  page: string;
  slug?: string;
  lang: 'en' | 'th';
}

const STATIC_PAGES_CONFIG = [
  { id: 'home', page: 'home', titleKey: 'nav.home', content: { en: 'Khao Yai Art Forest is a multidisciplinary platform for contemporary art in Thailand.', th: 'Khao Yai Art Forest เป็นพื้นที่ทางศิลปะร่วมสมัยและพหุสาขาวิชาในประเทศไทย' }, keywords: 'art contemporary thailand platform bangkok main ศิลปะ ร่วมสมัย ไทย กรุงเทพ' },
  { id: 'about', page: 'about', titleKey: 'nav.aboutUs', contentKey: 'about.description', keywords: 'history vision team background mission story who we are ประวัติ วิสัยทัศน์ ทีมงาน' },
  { id: 'vision', page: 'vision', titleKey: 'nav.vision', contentKey: 'about.vision.content', keywords: 'mission goals creativity dialogue future strategy manifesto พันธกิจ เป้าหมาย' },
  { id: 'visit', page: 'visit', titleKey: 'nav.visit', contentKey: 'visit.title', keywords: 'location map hours directions ticket access transport address ที่ตั้ง แผนที่ เวลาทำการ' },
  { id: 'exhibitions', page: 'exhibitions', titleKey: 'nav.exhibitions', content: { en: 'Discover our current, upcoming, and past exhibitions.', th: 'ค้นพบนิทรรศการปัจจุบัน นิทรรศการที่กำลังจะมาถึง และนิทรรศการที่ผ่านมา' }, keywords: 'show gallery display art artists calendar schedule นิทรรศการ ศิลปะ ศิลปิน' },
  { id: 'activities', page: 'activities', titleKey: 'nav.activities', content: { en: 'Join our educational programs, workshops, artist talks, and special events.', th: 'เข้าร่วมโปรแกรมการศึกษา เวิร์กช็อป การบรรยายของศิลปิน และกิจกรรมพิเศษของเรา' }, keywords: 'events workshops education talks programs learning public กิจกรรม เวิร์กช็อป การศึกษา' },
  { id: 'blog', page: 'blog', titleKey: 'nav.blog', content: { en: 'Read the latest updates, articles, interviews, and insights.', th: 'อ่านข่าวสารล่าสุด บทความ บทสัมภาษณ์ และข้อมูลเชิงลึก' }, keywords: 'articles updates press reviews insights journalism media บทความ ข่าวสาร สื่อ' },
  { id: 'support', page: 'support', titleKey: 'nav.support', content: { en: 'Help us sustain our mission by becoming a patron or donor.', th: 'ช่วยสนับสนุนพันธกิจของเราโดยการเป็นผู้มีอุปการคุณหรือผู้บริจาค' }, keywords: 'donate patron sponsorship funding membership giving philanthropy บริจาค สนับสนุน' },
  { id: 'contact', page: 'contact', titleKey: 'nav.contact', content: { en: 'Get in touch with us for inquiries, press information, or collaborations.', th: 'ติดต่อเราสำหรับการสอบถาม ข้อมูลสื่อมวลชน หรือความร่วมมือ' }, keywords: 'email phone address press inquiries connect hello ติดต่อ อีเมล โทรศัพท์' },
  { id: 'press', page: 'press', titleKey: 'nav.press', contentKey: 'press.title', keywords: 'media news kit release journalism download coverage สื่อ ข่าว ประชาสัมพันธ์' },
  { id: 'founder', page: 'founder', titleKey: 'nav.founder', contentKey: 'about.foundingDirector', keywords: 'biography leadership owner director profile ผู้ก่อตั้ง ผู้อำนวยการ' },
  { id: 'team', page: 'team', titleKey: 'nav.team', contentKey: 'team.team', keywords: 'staff curators management jobs careers hiring ทีมงาน ภัณฑารักษ์' },
  { id: 'residency', page: 'residency', titleKey: 'nav.residency', contentKey: 'residency.description', keywords: 'artist-in-residence studio program development exchange housing ศิลปินพำนัก' },
  { id: 'archives', page: 'archives', titleKey: 'nav.archives', content: { en: 'Explore our digital archives of past events and exhibitions.', th: 'สำรวจคลังข้อมูลดิจิทัลของกิจกรรมและนิทรรศการที่ผ่านมาของเรา' }, keywords: 'history past events database records library collection ประวัติ คลังข้อมูล' },
  { id: 'khaoyai', page: 'khaoyai', titleKey: 'nav.khaoyai', contentKey: 'khaoyai.title', keywords: 'kyaf khao yai art film festival nature เขาใหญ่ ศิลปะ ภาพยนตร์' },
  { id: 'shop', page: 'shop', titleKey: 'nav.shop', contentKey: 'shop.title', keywords: 'store merchandise books gifts buy ร้านค้า สินค้า หนังสือ' },
];

function stripHtml(html: string): string {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export async function getFullSearchData(): Promise<SearchDocument[]> {
  const data: SearchDocument[] = [];

  // 1. Static Pages (EN & TH)
  STATIC_PAGES_CONFIG.forEach(config => {
    // EN
    data.push({
      id: `${config.id}-en`,
      title: translations.en[config.titleKey as keyof typeof translations.en] || config.titleKey,
      content: config.contentKey 
        ? (translations.en[config.contentKey as keyof typeof translations.en] || '') 
        : (typeof config.content === 'object' ? config.content.en : ''),
      keywords: config.keywords,
      page: config.page,
      lang: 'en'
    });

    // TH
    data.push({
      id: `${config.id}-th`,
      title: translations.th[config.titleKey as keyof typeof translations.th] || config.titleKey,
      content: config.contentKey 
        ? (translations.th[config.contentKey as keyof typeof translations.th] || '') 
        : (typeof config.content === 'object' ? config.content.th : ''),
      keywords: config.keywords,
      page: config.page,
      lang: 'th'
    });
  });

  // 2. Bilingual Posts (Activities, Exhibitions, Blog)
  Object.values(MOCK_POSTS_BILINGUAL).forEach(post => {
    (['en', 'th'] as const).forEach(lang => {
      const p = post[lang];
      if (!p) return;

      let page = '';
      let keywords = '';

      if (p.type === 'activity') {
        page = 'activity-detail';
        keywords = `activity event ${p.categories?.join(' ') || ''}`;
      } else if (p.type === 'exhibition') {
        page = 'exhibition-detail';
        keywords = `exhibition art show`;
      } else if (p.type === 'post') {
        page = 'blog-detail';
        keywords = `blog news ${p.categories?.join(' ') || ''}`;
      }

      if (page) {
        data.push({
          id: `${p.type}-${p.slug}-${lang}`,
          title: p.title,
          content: stripHtml(p.content),
          keywords: keywords,
          page: page,
          slug: p.slug,
          lang: lang
        });
      }
    });
  });

  // 3. Records (Archives) - Currently assuming EN mostly, but we can duplicate for TH or just leave as EN
  // Since we don't have explicit TH translations for RECORDS in the file provided, we will map them to EN
  // and maybe provide a generic TH fallback if needed, or just let them be searchable in EN.
  // To make them searchable in TH mode, we should at least include them with lang='th' if we want them to appear in TH search results.
  RECORDS.forEach(record => {
      // Check if already exists in MOCK_POSTS_BILINGUAL (to avoid duplicates if they overlap)
      // The logic in original file did this.
      const exists = Object.values(MOCK_POSTS_BILINGUAL).some(p => p.en.slug === record.slug);
      if (exists) return;

      let page = '';
      let keywords = '';

      if (record.category === 'activity' || record.category === 'event') {
        page = 'activity-detail';
        keywords = `activity event ${record.status} ${record.description || ''}`;
      } else if (record.category === 'exhibition') {
        page = 'exhibition-detail';
        keywords = `exhibition art show ${record.status} ${record.description || ''}`;
      }

      if (page) {
        // Add for EN
        data.push({
          id: `record-${record.id}-en`,
          title: record.title,
          content: `${record.description || ''} (${record.date})`,
          keywords: keywords,
          page: page,
          slug: record.slug,
          lang: 'en'
        });

        // Add for TH (using same content as fallback, so it appears in TH search)
        data.push({
          id: `record-${record.id}-th`,
          title: record.title, // Keep EN title
          content: `${record.description || ''} (${record.date})`,
          keywords: keywords,
          page: page,
          slug: record.slug,
          lang: 'th'
        });
      }
  });

  // 4. Artists
  ARTISTS_DATA.forEach(artist => {
      // EN
      data.push({
          id: `artist-${artist.slug}-en`,
          title: artist.name,
          content: stripHtml(artist.bio + " " + artist.statement),
          keywords: `artist resident residency ${artist.period} ${artist.category}`,
          page: 'artist-detail',
          slug: artist.slug,
          lang: 'en'
      });
       // TH (Fallback)
      data.push({
          id: `artist-${artist.slug}-th`,
          title: artist.name,
          content: stripHtml(artist.bio + " " + artist.statement),
          keywords: `artist resident residency ${artist.period} ${artist.category}`,
          page: 'artist-detail',
          slug: artist.slug,
          lang: 'th'
      });
  });

  return data;
}

