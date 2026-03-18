/**
 * Activities Data Architecture
 * Following the same pattern as exhibitionsDataNew.ts
 */

/**
 * Activity Interface (Modern Bilingual Structure)
 */
export interface Activity {
  // Identifiers
  id: string;
  slug: string;
  
  // Bilingual Content
  title: {
    en: string;
    th: string;
  };
  artist?: {
    en: string;
    th: string;
  };
  
  // Date display
  dateDisplay: {
    en: string;
    th: string;
  };
  
  // Status & Classification
  status: 'current' | 'upcoming' | 'past';
  year: string;
  
  // Categories
  categories: {
    en: string[];
    th: string[];
  };
  
  // Media
  featuredImage: string;
  gallery?: string[];
  imageCredits?: string;
  
  // Preview text for listings
  listingSummary: {
    en: string;
    th: string;
  };
  
  // Additional metadata
  tags?: {
    en: string[];
    th: string[];
  };
  typeLabel?: {
    en: string;
    th: string;
  };
}

// Image constants
const IMG_KBAR = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Z44YyZbqstJ99oE8_03K-Bar_PhotobyAndreaRossetti-1920w.jpg";

/**
 * Activities Data
 * Single activity example
 */
export const activities: Activity[] = [
  {
    id: "1",
    slug: "k-bar-experience",
    title: {
      en: "K-BAR Experience",
      th: "K-BAR Experience"
    },
    artist: {
      en: "Elmgreen & Dragset",
      th: "เอล์มกรีน และ แดร็กเซ็ต"
    },
    dateDisplay: {
      en: "Every second Saturday of each month",
      th: "ทุกวันเสาร์ที่สองของเดือน"
    },
    status: 'current',
    year: "2024",
    categories: {
      en: ['Event', 'Social', 'Gastronomy'],
      th: ['กิจกรรม', 'สังคม', 'อาหารและเครื่องดื่ม']
    },
    featuredImage: IMG_KBAR,
    gallery: [
      IMG_KBAR,
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/K-Bar-exterior-night-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/K-Bar-interior-details-1920w.jpg"
    ],
    imageCredits: "Photo by Andrea Rossetti, Chinnakit Ruenma, Rungkit Tangtongpon",
    listingSummary: {
      en: "An intimate bar experience open once a month, offering craft cocktails in the heart of the forest.",
      th: "ประสบการณ์บาร์สุดพิเศษที่เปิดเดือนละครั้ง เสิร์ฟค็อกเทลคราฟท์ท่ามกลางป่า"
    },
    tags: {
      en: ["K-BAR", "Elmgreen & Dragset", "Monthly Event", "Cocktails", "Art Experience", "Limited Access", "Reservation Required", "Forest Bar", "Contemporary Art", "Social Art"],
      th: ["K-BAR", "เอล์มกรีน และ แดร็กเซ็ต", "กิจกรรมรายเดือน", "ค็อกเทล", "ประสบการณ์ศิลปะ", "การเข้าถึงจำกัด", "ต้องจองล่วงหน้า", "บาร์ในป่า", "ศิลปะร่วมสมัย", "ศิลปะสังคม"]
    },
    typeLabel: {
      en: "Monthly Event",
      th: "กิจกรรมรายเดือน"
    }
  }
];

/**
 * Get activity by slug
 */
export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find(act => act.slug === slug);
}

/**
 * Get activities by status
 */
export function getActivitiesByStatus(status: 'current' | 'upcoming' | 'past'): Activity[] {
  return activities.filter(act => act.status === status);
}

/**
 * Get all activities for a specific year
 */
export function getActivitiesByYear(year: string): Activity[] {
  return activities.filter(act => act.year === year);
}
