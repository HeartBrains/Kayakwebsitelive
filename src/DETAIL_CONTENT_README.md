# Detail Content System - Implementation Guide

## 🎯 Quick Start

The detail content system separates long-form descriptions from metadata for cleaner data management and better bilingual support.

### Basic Usage

```tsx
import { getDetailContentByLanguage } from './utils/detailContent';

// In your component
const content = getDetailContentByLanguage(slug, language);

// Render it
<div 
  className="space-y-6"
  dangerouslySetInnerHTML={{ __html: content }}
/>
```

## 📁 File Structure

```
/utils/
├── detailContent.ts              ← English content + helper functions
├── detailContentThaiData.ts      ← Thai content + helper functions
├── exhibitionsDataNew.ts         ← Exhibition metadata
├── activitiesDataNew.ts          ← Activity metadata
└── residencyDataNew.ts           ← Residency metadata (new)
```

## 🔑 Key Concepts

### 1. **Metadata Files** (What goes on listing pages)
- Short, structured data
- Title, dates, images, tags
- Bilingual labels

### 2. **Detail Content Files** (What goes on detail pages)
- Long-form descriptions
- Essays and biographies
- Full HTML content

### 3. **Slug Matching** (How they connect)
- Both files use the same `slug` field
- Example: `slug: 'madrid-circle'`
- Must match exactly between metadata and content

## 💻 Available Helper Functions

### Main API
```ts
// Get content in user's language
getDetailContentByLanguage(slug: string, language: 'en' | 'th'): string | undefined
```

### English Only
```ts
getDetailContent(slug: string): string | undefined
```

### Thai Only
```ts
getDetailContentThai(slug: string): string | undefined
```

### By Category
```ts
getDetailsByCategory(
  category: 'Exhibition' | 'Activity' | 'Residency'
): DetailContent[]
```

### Check Existence
```ts
hasDetailContent(slug: string): boolean
```

## 📝 Content Format

### HTML Structure
```html
<p>First paragraph of description...</p>

<p>Second paragraph with more details...</p>

<p>Additional content...</p>

<p> Artist Biography </p>  <!-- Note: spaces around text -->

<p>Artist Name (b. YEAR, Country) brief introduction.</p>

<p>More biographical information...</p>
```

### Supported HTML Tags
- `<p>` - Paragraphs (automatically spaced)
- `<h2>` - Section headings
- `<h3>` - Subsection headings
- `<strong>` - Bold text
- `<em>` - Italic text
- `<ul>` / `<ol>` / `<li>` - Lists
- `<blockquote>` - Quotes

## 🌏 Bilingual Support

### English Content
```ts
// /utils/detailContent.ts
{
  slug: 'madrid-circle',
  category: 'Exhibition',
  content: `<p>English description...</p>`
}
```

### Thai Content (Same Slug!)
```ts
// /utils/detailContentThaiData.ts
{
  slug: 'madrid-circle',  // ← Must match English
  category: 'Exhibition',
  content: `<p>คำอธิบายภาษาไทย...</p>`
}
```

## ➕ Adding New Content

### Step 1: Add Metadata
```ts
// /utils/exhibitionsDataNew.ts
{
  id: "6",
  slug: "new-exhibition",  // ← Choose unique slug
  title: {
    en: "Exhibition Title",
    th: "ชื่อนิทรรศการ"
  },
  artist: {
    en: "Artist Name",
    th: "ชื่อศิลปิน"
  },
  fromDate: "2026-04-01",
  toDate: "2026-06-30",
  dateDisplay: createDateDisplay("2026-04-01", "2026-06-30"),
  status: 'upcoming',
  year: "2026",
  featuredImage: "https://...",
  gallery: ["https://..."],
  imageCredits: "Photo by..."
}
```

### Step 2: Add English Content
```ts
// /utils/detailContent.ts - Add to DETAIL_CONTENT array
{
  slug: 'new-exhibition',  // ← Same slug as metadata
  category: 'Exhibition',
  content: `
    <p>Opening paragraph describing the exhibition concept...</p>
    
    <p>Detailed analysis of the artworks and themes...</p>
    
    <p>Discussion of the artist's approach...</p>
    
    <p> Artist Biography </p>
    
    <p>Artist Name (b. YEAR, Country) is known for...</p>
    
    <p>Their work has been exhibited at...</p>
  `
}
```

### Step 3: Add Thai Content
```ts
// /utils/detailContentThaiData.ts - Add to DETAIL_CONTENT_THAI array
{
  slug: 'new-exhibition',  // ← Exact same slug
  category: 'Exhibition',
  content: `
    <p>ย่อหน้าแรกที่อธิบายแนวคิดของนิทรรศการ...</p>
    
    <p>การวิเคราะห์โดยละเอียดของผลงานและธีม...</p>
    
    <p>การอภิปรายเกี่ยวกับแนวทางของศิลปิน...</p>
    
    <p> ประวัติศิลปิน </p>
    
    <p>ชื่อศิลปิน (เกิด พ.ศ. YEAR, ประเทศ) เป็นที่รู้จักจาก...</p>
    
    <p>ผลงานของพวกเขาได้รับการจัดแสดงที่...</p>
  `
}
```

## 🎨 CSS Styling

The detail content automatically receives proper spacing and styling through global CSS. You can apply language-specific styling:

```tsx
<div 
  className={`space-y-6 ${language === 'th' ? 'leading-[1.82em]' : ''}`}
  dangerouslySetInnerHTML={{ __html: content }}
/>
```

## ✅ Best Practices

### DO:
- ✅ Use consistent slugs across all files
- ✅ Keep the same order in English and Thai files
- ✅ Use semantic HTML tags
- ✅ Add content in both languages
- ✅ Test language switching

### DON'T:
- ❌ Mix content with metadata
- ❌ Use inline styles in HTML
- ❌ Forget to add Thai translations
- ❌ Use different slugs for same content
- ❌ Hardcode language-specific text in components

## 🔍 Debugging

### Content Not Showing?
1. Check slug matches exactly: `console.log(slug)`
2. Verify content exists: `hasDetailContent(slug)`
3. Check language value: `console.log(language)`
4. Inspect returned content: `console.log(content)`

### Wrong Language Showing?
1. Verify language context is working
2. Check Thai content file has matching slug
3. Ensure getDetailContentByLanguage is called correctly

## 📊 Current Content Inventory

### Exhibitions (5)
- madrid-circle
- fog-forest
- araya-rasdjarmrearnsook
- walking-with-trees
- light-and-shadow

### Activities (5)
- k-bar-experience
- forest-meditation
- artist-workshops
- nature-photography-walks
- seasonal-festivals

### Residencies (4)
- cole-lu
- nicolas-amato
- spencer-sweeney
- sarah-chen

## 🚀 Implementation Examples

### Artist Detail Page (Updated)
```tsx
import { getDetailContentByLanguage } from '../../utils/detailContent';

function ArtistDetailPage({ slug }) {
  const { language } = useLanguage();
  const [content, setContent] = useState('');
  
  useEffect(() => {
    const detailContent = getDetailContentByLanguage(slug, language) || '';
    setContent(detailContent);
  }, [slug, language]);
  
  return (
    <div 
      className={`${language === 'th' ? 'leading-[1.82em]' : ''}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
```

### Exhibition Detail Page (To Update)
Same pattern - replace bio/description rendering with detail content system.

### Activity Detail Page (To Update)
Same pattern - replace description rendering with detail content system.

## 📚 Reference Documents

- `/imports/DETAIL_CONTENT_ARCHITECTURE.md` - Full architectural guide from Bangkok Kunsthalle
- `/ARCHITECTURE_IMPLEMENTATION_SUMMARY.md` - Implementation summary
- `/utils/detailContent.ts` - Source code with examples

## 🆘 Support

For questions or issues with the detail content system:
1. Check this README
2. Review the architecture guide
3. Inspect example implementations
4. Test with console logging

---

**Last Updated**: March 17, 2026  
**Status**: ✅ Implemented  
**Current Implementation**: ArtistDetailPage  
**Pending**: ExhibitionDetailPage, ActivityDetailPage
