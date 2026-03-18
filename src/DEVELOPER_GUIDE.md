# Developer Quick Reference Guide
## Khao Yai Art Forest Website

**Last Updated**: March 17, 2026

---

## 🚀 Quick Start

### Import Utilities
All utilities are now accessible from a single import:

```typescript
// Import what you need
import { useLanguage, formatDateDisplay, getCurrentItems } from '@/utils';

// Or import everything
import * as utils from '@/utils';
```

---

## 📝 Common Patterns

### 1. Using Language Context

```tsx
import { useLanguage } from '@/utils';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <p>{language === 'th' ? 'สวัสดี' : 'Hello'}</p>
    </div>
  );
}
```

### 2. Bilingual Text Rendering

```tsx
// Pattern 1: Separate blocks (RECOMMENDED)
{language !== 'th' && (
  <p className="text-xl md:text-2xl">
    {englishText}
  </p>
)}
{language === 'th' && (
  <p className="text-xl md:text-2xl leading-[1.82em]">
    {thaiText}
  </p>
)}

// Pattern 2: Using BilingualText component
import { BilingualText } from '@/components/layout/PageLayout';

<BilingualText
  en="English text"
  th="ข้อความภาษาไทย"
  language={language}
  className="text-xl md:text-2xl"
/>
```

### 3. Formatting Dates

```tsx
import { formatDateDisplay, formatDateRange } from '@/utils';

// Single date
const displayDate = formatDateDisplay('2026-03-17', language);
// English: "17 March 2026"
// Thai: "17 มีนาคม 2569"

// Date range
const dateRange = formatDateRange('2026-03-10', '2026-06-20', language);
// English: "10 March 2026 - 20 June 2026"
// Thai: "10 มีนาคม 2569 - 20 มิถุนายน 2569"

// Ongoing events
const ongoing = formatDateRange('2026-03-10', 'Onwards', language);
// English: "10 March 2026 Onwards"
// Thai: "10 มีนาคม 2569 เป็นต้นไป"
```

### 4. Filtering Content (Status-First Logic)

```tsx
import { getCurrentItems, getUpcomingItems, getPastItems } from '@/utils';

function ExhibitionsPage() {
  const { language } = useLanguage();
  const allExhibitions = getAllExhibitions(); // Your data source
  
  const current = getCurrentItems(allExhibitions);
  const upcoming = getUpcomingItems(allExhibitions);
  const past = getPastItems(allExhibitions);
  
  return (
    <div>
      <h2>Current: {current.length}</h2>
      <h2>Upcoming: {upcoming.length}</h2>
      <h2>Past: {past.length}</h2>
    </div>
  );
}
```

### 5. Using Layout Components

```tsx
import { PageLayout, TwoColumnSection } from '@/components/layout/PageLayout';

function MyPage() {
  return (
    <PageLayout withHeaderPadding={true}>
      <TwoColumnSection
        heading={<h2>Section Title</h2>}
        id="my-section"
      >
        {/* Your content here */}
      </TwoColumnSection>
    </PageLayout>
  );
}
```

### 6. Creating Image Cards

```tsx
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

<div className="flex flex-col gap-6 w-full cursor-pointer group">
  {/* Image Container */}
  <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
    <ImageWithFallback 
      src={imageUrl}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  </div>
  
  {/* Content */}
  <div className="flex flex-col gap-4">
    {language !== 'th' && (
      <div className="flex flex-col gap-1">
        <h3 className="text-lg md:text-xl font-normal">{title}</h3>
        <p className="text-lg md:text-xl text-gray-500">{subtitle}</p>
      </div>
    )}
    {language === 'th' && (
      <div className="flex flex-col gap-1">
        <h3 className="text-lg md:text-xl font-normal leading-[1.82em]">{titleTh}</h3>
        <p className="text-lg md:text-xl text-gray-500 leading-[1.82em]">{subtitleTh}</p>
      </div>
    )}
  </div>
</div>
```

---

## 🎨 Design System

### Typography Sizes (Use CSS Variables)
```typescript
--font-size-sm: 0.875rem;    // 14px - Small text
--font-size-base: 1rem;       // 16px - Body text
--font-size-lg: 1.25rem;      // 20px - Large text
--font-size-xl: 1.75rem;      // 28px - Headings
--font-size-2xl: 2.25rem;     // 36px - Large headings
```

### Font Weights
```typescript
--font-weight-light: 300;     // Light
--font-weight-normal: 400;    // Normal/Regular
--font-weight-medium: 500;    // Medium
--font-weight-bold: 700;      // Bold
```

### Spacing Scale
```typescript
// Section spacing
mb-32 md:mb-40           // Bottom margin for sections

// Grid gaps
gap-12 md:gap-16         // Between items in grid
gap-12                   // Activities grid
gap-6                    // Within cards
gap-4                    // Info blocks
gap-1                    // Tight grouping

// Gutters
px-[6vw]                 // Horizontal page padding
pt-[96px]                // Top padding (clears header)
```

### Thai Text Line-Height
```tsx
// Always add this for Thai text
className="leading-[1.82em]"

// Or use utility class
className="thai-text"

// Or use helper function
import { getThaiClass } from '@/utils';
className={getThaiClass(language, 'text-xl')}
```

---

## 🔧 Configuration

### Toggle Features
Edit `/utils/siteConfig.ts`:

```typescript
export const siteConfig = {
  menu: {
    exhibitions: true,  // Show/hide menu item
    activities: true,
    // ...
  },
  
  visibility: {
    exhibitions: {
      current: true,    // Show/hide section
      upcoming: true,
      past: true,
    },
    // ...
  },
  
  links: {
    booking: 'https://...',  // External URLs
    // ...
  }
};
```

### Empty States
```tsx
import { getEmptyStateMessage } from '@/utils';

{items.length === 0 && (
  <p>{getEmptyStateMessage('comingSoon', language)}</p>
)}
```

---

## 📊 Data Structure

### Adding Status to Content
```typescript
{
  id: 'my-exhibition',
  slug: 'my-exhibition',
  title: 'Exhibition Title',
  acf: {
    fromDate: '2026-03-10',      // ISO format
    toDate: '2026-06-20',        // ISO format or "Onwards"
    status: 'current',           // Override date logic
    // ...
  }
}
```

**Status Values**:
- `'current'` - Show in Current section (overrides dates)
- `'upcoming'` - Show in Upcoming section (overrides dates)
- `'past'` - Show in Past/Archive section (overrides dates)
- `undefined` - Use date-based logic

---

## 🎯 Layout Templates

### Two-Column Page
```tsx
<div className="w-full bg-white min-h-screen pb-24">
  {/* Hero */}
  <ParallaxHero image={heroImage} height="h-[80vh]">
    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent" />
  </ParallaxHero>

  {/* Content */}
  <div className="w-full px-[6vw] pt-[96px]">
    <section className="flex flex-col md:flex-row mb-32 md:mb-40">
      {/* Left: Sticky Heading */}
      <div className="w-full md:w-1/2 mb-12 md:mb-0">
        <h2 className="text-xl md:text-2xl font-normal sticky top-32">
          {heading}
        </h2>
      </div>
      
      {/* Right: Content Grid */}
      <div className="w-full md:w-1/2 flex flex-col gap-12 md:gap-16">
        {items.map(item => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  </div>
</div>
```

---

## 🔍 Common Tasks

### 1. Add New Page
```typescript
// 1. Create component in /components/pages/
// 2. Use standard layout
import { PageLayout, TwoColumnSection } from '@/components/layout/PageLayout';

export function MyNewPage() {
  return (
    <PageLayout>
      <TwoColumnSection heading={<h2>Title</h2>}>
        {/* Content */}
      </TwoColumnSection>
    </PageLayout>
  );
}

// 3. Add route in App.tsx
// 4. Add menu item in MenuOverlay.tsx
// 5. Add translations in /utils/translations.ts
```

### 2. Add New Content Type
```typescript
// 1. Define interface in /utils/types.ts
export interface MyContent {
  id: string;
  slug: string;
  title: BilingualText;
  // ...
}

// 2. Create data file in /utils/
export const MY_CONTENT_DATA = { /* ... */ };

// 3. Add to /utils/index.ts exports
export { MY_CONTENT_DATA } from './myContentData';

// 4. Create filter helpers if needed
// Use contentHelpers.ts functions
```

### 3. Update Translations
```typescript
// Edit /utils/translations.ts
export const translations = {
  en: {
    nav: {
      myNewItem: 'My New Item',
    },
  },
  th: {
    nav: {
      myNewItem: 'รายการใหม่',
    },
  },
};
```

---

## ⚠️ Common Pitfalls

### ❌ Don't Do This
```tsx
// Hard-coded text
<p>Welcome</p>

// Mixed language in one view
<p>{language === 'th' ? thaiText : englishText}</p>

// Fixed pixel margins for layout
<div className="px-12 md:px-24">

// Tailwind font classes (except specific exceptions)
<h1 className="text-2xl font-bold">

// Forgetting Thai line-height
{language === 'th' && <p>{text}</p>}

// Date-only filtering
items.filter(item => item.date > today)
```

### ✅ Do This Instead
```tsx
// Use translations
<p>{t('common.welcome')}</p>

// Separate language blocks
{language !== 'th' && <p>{englishText}</p>}
{language === 'th' && <p className="leading-[1.82em]">{thaiText}</p>}

// Percentage-based margins
<div className="px-[6vw]">

// Let CSS variables handle typography
<h1>Title</h1>

// Always add Thai line-height
{language === 'th' && <p className="leading-[1.82em]">{text}</p>}

// Status-first filtering
getCurrentItems(items) // Uses status + date logic
```

---

## 📚 File Structure Reference

```
/
├── utils/
│   ├── index.ts              # Central export (USE THIS!)
│   ├── siteConfig.ts         # Site configuration
│   ├── dateHelpers.ts        # Date formatting
│   ├── contentHelpers.ts     # Content filtering
│   ├── bilingualHelpers.ts   # Bilingual utilities
│   ├── languageContext.tsx   # Language state
│   ├── translations.ts       # UI translations
│   ├── types.ts              # TypeScript interfaces
│   └── mockDataBilingual.ts  # Content data
│
├── components/
│   ├── layout/
│   │   ├── PageLayout.tsx    # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MenuOverlay.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ExhibitionsPage.tsx
│   │   └── sections/
│   │       └── VisitInfo.tsx # Reference implementation
│   │
│   └── ui/                   # ShadCN components
│
├── styles/
│   └── globals.css           # Design system tokens
│
└── imports/
    └── ARCHITECTURE_GUIDE.md # Complete reference
```

---

## 🎓 Learning Resources

1. **Architecture Guide**: `/imports/ARCHITECTURE_GUIDE.md`  
   Complete reference for all patterns and practices

2. **Implementation Summary**: `/ARCHITECTURE_IMPROVEMENTS.md`  
   What was changed and why

3. **Guidelines**: `/Guidelines.md`  
   Project-specific design rules

4. **Reference Component**: `/components/pages/sections/VisitInfo.tsx`  
   Perfect example of all patterns in one file

---

## 🤝 Need Help?

1. Check the Architecture Guide first
2. Look at VisitInfo.tsx for examples
3. Use the central `/utils/index.ts` for all imports
4. Follow the patterns in existing pages
5. Test with both EN and TH languages
6. Verify responsive behavior (mobile/desktop)

---

**Happy Coding! 🚀**
