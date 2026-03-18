/**
 * Central Export for All Utilities
 * Import everything you need from a single location
 */

// Language Context
export { useLanguage, LanguageProvider } from './languageContext';
export type { LanguageContextType } from './languageContext';

// Translations
export { translations } from './translations';

// Site Configuration
export { 
  siteConfig, 
  getEmptyStateMessage, 
  isMenuVisible, 
  isSectionVisible,
  isHomeSectionVisible
} from './siteConfig';

// Date Helpers
export {
  formatDateDisplay,
  formatDateRange,
  toBuddhistYear,
  parseISODate,
  getCurrentDate,
  isPastDate,
  isFutureDate,
  isDateInRange
} from './dateHelpers';

// Content Helpers (Generic)
export {
  getCurrentItems,
  getUpcomingItems,
  getPastItems,
  getItemBySlug,
  getItemsByCategory,
  getItemsByType,
  sortByDateDesc,
  sortByDateAsc,
  getFeaturedItems,
  searchItems
} from './contentHelpers';
export type { ContentStatus } from './contentHelpers';

// Exhibition Helpers (Specific)
export {
  getCurrentExhibitions,
  getUpcomingExhibitions,
  getPastExhibitions,
  getAllExhibitions,
  getExhibitionBySlugWithLanguage,
  getExhibitionsByYear,
  getPermanentExhibitions,
  searchExhibitions,
  exhibitionToWPPost
} from './exhibitionHelpers';

// Activity Helpers (Specific)
export {
  getCurrentActivities,
  getUpcomingActivities,
  getPastActivities,
  getAllActivities,
  getActivityBySlugWithLanguage,
  getActivitiesByCategoryWithLanguage,
  getPermanentActivities,
  searchActivities,
  activityToWPPost
} from './activityHelpers';

// Bilingual Helpers
export {
  getText,
  getThaiClass,
  formatList,
  truncateText,
  pluralize,
  getOrdinal,
  createBilingualText,
  isBilingualEmpty,
  getReadingTime,
  formatReadingTime
} from './bilingualHelpers';

// Types
export type {
  WPImage,
  WPScheduleItem,
  WPPost,
  BilingualText,
  Exhibition,
  Activity,
  TeamMember,
  PressItem
} from './types';

// Data exports (New Architecture - Source of Truth)
export { exhibitions, getExhibitionBySlug, getExhibitionsByStatus, getExhibitionsByYear } from './exhibitionsDataNew';
export type { Exhibition as ExhibitionData } from './exhibitionsDataNew';

export { activities, getActivityBySlug, getActivitiesByStatus, getActivitiesByYear } from './activitiesDataNew';
export type { Activity as ActivityData } from './activitiesDataNew';

export { createBilingualPost, exhibitionToWPPost as convertExhibitionToPost, activityToWPPost as convertActivityToPost, getPostBySlug } from './dataAdapter';
export * from './imageConstants';

// Legacy Data (for backward compatibility)
export { TEAM_DATA_BILINGUAL } from './teamDataBilingual';
export { PRESS_DATA_BILINGUAL } from './pressDataBilingual';
export { RESIDENCY_DATA_BILINGUAL } from './residencyData';

/**
 * Usage Examples:
 * 
 * 1. Import language context:
 *    import { useLanguage } from '@/utils';
 * 
 * 2. Import multiple utilities:
 *    import { formatDateDisplay, getCurrentExhibitions, getThaiClass } from '@/utils';
 * 
 * 3. Import types:
 *    import type { WPPost, BilingualText, Exhibition } from '@/utils';
 * 
 * 4. Import specific helpers:
 *    import { getCurrentExhibitions, getCurrentActivities } from '@/utils';
 * 
 * 5. Import everything:
 *    import * as utils from '@/utils';
 *    const exhibitions = utils.getCurrentExhibitions(language);
 */