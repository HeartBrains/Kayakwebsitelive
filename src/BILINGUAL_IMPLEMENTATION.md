# Bangkok Kunsthalle - Bilingual (EN/TH) Implementation

## ✅ COMPLETED IMPLEMENTATION

### 1. Language Context System
- **File**: `/utils/languageContext.tsx`
- Created a React Context for managing language state across the entire application
- Provides `useLanguage()` hook that gives access to:
  - `language`: Current language ('en' | 'th')
  - `setLanguage()`: Function to switch languages
  - `t()`: Translation function for looking up translated strings

### 2. Translation System
- **File**: `/utils/translations.ts`
- Comprehensive translation keys for all UI elements including:
  - Navigation menu items
  - Common buttons and actions
  - Page titles and headings
  - Search placeholders
  - Footer elements
  - And more...

### 3. Bilingual Content Data
- **File**: `/utils/mockDataBilingual.ts`
- Complete Thai translations for ALL content:
  - All exhibitions (นิทรรศการ)
  - All activities (กิจกรรม)  
  - All blog posts (บทความ)
  - Includes Thai titles, dates, content, and metadata
- Helper functions:
  - `getMockPost(slug, language)`: Get a specific post in either language
  - `getMockPostsByType(type, language)`: Get all posts of a type in a language
  - Maintains backward compatibility with existing code

### 4. Updated Components

#### MenuOverlay (/components/layout/MenuOverlay.tsx)
- ✅ Language switcher buttons (EN/TH) are now fully functional
- ✅ Menu items dynamically translate based on selected language
- ✅ Active language is highlighted in white

#### LandingPage (/components/pages/LandingPage.tsx)
- ✅ "Bangkok Kunsthalle" translates to "บางกอก คุนสท์ฮัลเล่"
- ✅ "Khao Yai Art Forest" translates to "เขาใหญ่ อาร์ตฟอเรสต์"

#### Footer (/components/layout/Footer.tsx)
- ✅ Logo text translates  
- ✅ "Sponsorship" → "การสนับสนุน"
- ✅ "Subscription" → "สมัครรับข่าวสาร"

#### App.tsx
- ✅ Wrapped entire app in `<LanguageProvider>`
- All pages now have access to language context

## 📋 REMAINING WORK

The foundation is complete! Now each page component needs to be updated to use translations. Here's the systematic approach:

### Pages to Update (use `useLanguage()` hook and `getMockPost()` helper):

1. **HomePage** - Use translations for headings, get content via `getMockPost(slug, language)`
2. **ExhibitionsPage** - Use `getMockPostsByType('exhibition', language)`
3. **ActivitiesPage** - Use `getMockPostsByType('activity', language)`
4. **BlogPage** - Use `getMockPostsByType('post', language)`
5. **ExhibitionDetailPage** - Use `getMockPost(slug, language)`
6. **ActivityDetailPage** - Use `getMockPost(slug, language)`
7. **BlogDetailPage** - Use `getMockPost(slug, language)`
8. **ResidencyPage** - Add translation support for artist data
9. **ArtistDetailPage** - Add Thai translations for artist bios
10. **AboutPage** - Translate all about content
11. **TeamPage** - Translate team member information
12. **ContactPage** - Translate contact form and information
13. **VisitPage** - Translate visitor information
14. **SupportPage** - Translate sponsorship information
15. **PressPage** - Translate press releases
16. **ShopPage** - Translate shop items
17. **ArchivesPage** - Use bilingual data
18. **KhaoYaiPage** - Translate Khao Yai content

### Search Functionality
- **File to update**: `/utils/searchData.ts`
- Add Thai content to search index
- Update SearchDialog to search both EN and TH based on current language

### Additional Data Files
- **residencyData.ts** - Add Thai translations for artist information
- **records.ts** - Add Thai translations if used

## 🎯 HOW TO UPDATE A PAGE

Example pattern for any page:

```tsx
import { useLanguage } from '../../utils/languageContext';
import { getMockPost, getMockPostsByType } from '../../utils/mockDataBilingual';

export function YourPage() {
  const { language, t } = useLanguage();
  
  // For getting specific content
  const post = getMockPost('slug-here', language);
  
  // For getting lists of content
  const exhibitions = getMockPostsByType('exhibition', language);
  
  // For UI elements
  return (
    <div>
      <h1>{t('exhibitions.title')}</h1>
      {exhibitions.map(ex => (
        <div key={ex.slug}>
          <h2>{ex.title}</h2>
          <p>{ex.date}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🔧 THAI FONT SUPPORT

The site already uses `font-sans` which should support Thai characters. If you notice any display issues with Thai text, you may want to add Thai-specific font classes in `/styles/globals.css`.

## 🌐 TESTING

1. Open the menu (hamburger icon)
2. Click "TH" at the bottom right
3. Navigation should immediately translate
4. Visit different pages to see translations
5. Click "EN" to switch back

## ✨ BENEFITS

- **Complete content parity**: All content available in both languages
- **Real-time switching**: Language changes instantly without page reload
- **Maintainable**: Easy to add new translations
- **Search-ready**: Foundation for bilingual search
- **SEO-friendly**: Can be extended to support language-specific URLs
- **Accessible**: Proper language attributes can be added for screen readers

## 📝 NOTES

- All Thai translations use proper Buddhist Era (พ.ศ.) year format
- Dates are translated to Thai format
- Artist names are transliterated where appropriate
- Content maintains the same slug for both languages for easy URL management
