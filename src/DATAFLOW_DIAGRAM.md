# Data Flow Diagram - Detail Content Architecture

## Complete Data Flow for Detail Pages

```
┌─────────────────────────────────────────────────────────────────┐
│  USER ACTION                                                     │
│  User clicks on "Madrid Circle" exhibition                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  NAVIGATION                                                      │
│  Router passes slug: "madrid-circle"                            │
│  Language context provides: "en" or "th"                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          │                             │
          ▼                             ▼
┌──────────────────────┐       ┌──────────────────────┐
│  GET METADATA        │       │  GET DETAIL CONTENT  │
│                      │       │                      │
│  Source:             │       │  Source:             │
│  exhibitionsDataNew  │       │  detailContent.ts    │
│                      │       │                      │
│  Find by:            │       │  Find by:            │
│  slug =              │       │  slug =              │
│  "madrid-circle"     │       │  "madrid-circle"     │
│                      │       │                      │
│  Returns:            │       │  Function:           │
│  • title (bilingual) │       │  getDetailContent    │
│  • artist            │       │  ByLanguage()        │
│  • dates             │       │                      │
│  • gallery images    │       │  Returns:            │
│  • status            │       │  • HTML content      │
└──────────┬───────────┘       │  • In selected lang  │
           │                   └──────────┬───────────┘
           │                              │
           │                              │ (if language === 'th')
           │                              │
           │                              ▼
           │                   ┌──────────────────────┐
           │                   │  LANGUAGE SWITCH     │
           │                   │                      │
           │                   │  detailContent       │
           │                   │  ThaiData.ts         │
           │                   │                      │
           │                   │  Find by:            │
           │                   │  slug =              │
           │                   │  "madrid-circle"     │
           │                   │                      │
           │                   │  Returns:            │
           │                   │  • Thai HTML content │
           │                   └──────────┬───────────┘
           │                              │
           └──────────────┬───────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  COMPONENT STATE                                                 │
│  const [artist, setArtist] = metadata                           │
│  const [content, setContent] = detailContent                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  RENDER DETAIL PAGE                                              │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  CAROUSEL (from metadata.gallery)                          │ │
│  │  [Image 1] [Image 2] [Image 3]                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  LEFT COLUMN - METADATA                                    │ │
│  │  • Title: "Madrid Circle" / "มาดริด เซอร์เคิล"            │ │
│  │  • Artist: "Krittawat..." / "กฤตวัฒน์..."                 │ │
│  │  • Period: "7 December..." / "7 ธันวาคม..."               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  RIGHT COLUMN - DETAIL CONTENT                             │ │
│  │  <div dangerouslySetInnerHTML={{ __html: content }}>      │ │
│  │                                                            │ │
│  │  <p>Madrid Circle is a permanent installation...</p>      │ │
│  │  <p>The installation consists of circular...</p>          │ │
│  │  <p>Through careful placement and...</p>                  │ │
│  │  <p> Artist Biography </p>                                │ │
│  │  <p>Krittawat Thamchalerm and Puttisin...</p>             │ │
│  │                                                            │ │
│  │  </div>                                                    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## File Interaction Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    METADATA LAYER                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  exhibitionsDataNew.ts     activitiesDataNew.ts                 │
│  ├─ Exhibition[]           ├─ Activity[]                        │
│  │  ├─ id                  │  ├─ id                             │
│  │  ├─ slug ─────┐         │  ├─ slug ─────┐                   │
│  │  ├─ title     │         │  ├─ title     │                   │
│  │  ├─ artist    │         │  ├─ category  │                   │
│  │  └─ dates     │         │  └─ dates     │                   │
│                  │                          │                   │
│  residencyDataNew.ts                        │                   │
│  ├─ Residency[]                             │                   │
│  │  ├─ id                                   │                   │
│  │  ├─ slug ─────┐                          │                   │
│  │  ├─ name      │                          │                   │
│  │  └─ period    │                          │                   │
│                  │                          │                   │
└──────────────────┼──────────────────────────┼───────────────────┘
                   │                          │
                   │  SLUG CONNECTION         │
                   │  (matching key)          │
                   │                          │
┌──────────────────┼──────────────────────────┼───────────────────┐
│                  │   CONTENT LAYER          │                   │
├──────────────────┼──────────────────────────┼───────────────────┤
│                  │                          │                   │
│  detailContent.ts (ENGLISH)                 │                   │
│  ├─ DETAIL_CONTENT[]                        │                   │
│  │  ├─ { slug: "madrid-circle" ◄────────────┘                   │
│  │  │    category: "Exhibition"                                 │
│  │  │    content: "<p>English...</p>" }                         │
│  │  ├─ { slug: "k-bar-experience" ◄──────────────────────────┐ │
│  │  │    category: "Activity"                                 │ │
│  │  │    content: "<p>English...</p>" }                       │ │
│  │  └─ { slug: "cole-lu" ◄────────────────────────────────┐   │ │
│  │       category: "Residency"                             │   │ │
│  │       content: "<p>English...</p>" }                    │   │ │
│  │                                                         │   │ │
│  └─ Helper Functions:                                      │   │ │
│     ├─ getDetailContent(slug)                              │   │ │
│     └─ getDetailContentByLanguage(slug, lang) ─────┐       │   │ │
│                                                     │       │   │ │
│  detailContentThaiData.ts (THAI)                   │       │   │ │
│  ├─ DETAIL_CONTENT_THAI[]                          │       │   │ │
│  │  ├─ { slug: "madrid-circle" ◄──────────────────────────────┘ │
│  │  │    category: "Exhibition"                   │           │ │
│  │  │    content: "<p>ไทย...</p>" }               │           │ │
│  │  ├─ { slug: "k-bar-experience" ◄───────────────┼───────────┘ │
│  │  │    category: "Activity"                     │             │
│  │  │    content: "<p>ไทย...</p>" }               │             │
│  │  └─ { slug: "cole-lu" ◄────────────────────────┘             │
│  │       category: "Residency"                                  │
│  │       content: "<p>ไทย...</p>" }                             │
│  │                                                               │
│  └─ Helper Functions:                                           │
│     └─ getDetailContentThai(slug) ◄─────────────────────────────┘
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    COMPONENT LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ArtistDetailPage.tsx                                           │
│  ExhibitionDetailPage.tsx (to update)                           │
│  ActivityDetailPage.tsx (to update)                             │
│                                                                  │
│  Pattern:                                                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ useEffect(() => {                                          │ │
│  │   // Get metadata                                          │ │
│  │   const metadata = getMetadata(slug);                      │ │
│  │                                                            │ │
│  │   // Get detail content                                   │ │
│  │   const content = getDetailContentByLanguage(slug, lang); │ │
│  │                                                            │ │
│  │   setState({ metadata, content });                        │ │
│  │ }, [slug, language]);                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Slug Matching Examples

### ✅ CORRECT - Same slug across all layers

```
Metadata:        slug: "madrid-circle"
English Content: slug: "madrid-circle"  ← Match!
Thai Content:    slug: "madrid-circle"  ← Match!
Result:          ✅ Content loads correctly
```

### ❌ WRONG - Mismatched slugs

```
Metadata:        slug: "madrid-circle"
English Content: slug: "madrid-circle"  ← Match
Thai Content:    slug: "madrid_circle"  ← NO MATCH (underscore)
Result:          ❌ Thai content won't load
```

## Data Types Flow

```
┌──────────────────┐
│  Exhibition      │  ← Metadata Interface
├──────────────────┤
│  id: string      │
│  slug: string ───┼──────────────────┐
│  title: {...}    │                  │
│  artist: {...}   │                  │
│  dates: {...}    │                  │
└──────────────────┘                  │
                                      │
                                      │ Connection
                                      │ via slug
                                      │
┌──────────────────┐                  │
│  DetailContent   │  ← Content Interface
├──────────────────┤                  │
│  slug: string ───┼──────────────────┘
│  category: enum  │
│  content: string │  ← HTML
└──────────────────┘
```

## Language Switching Flow

```
User clicks language toggle
         │
         ▼
┌────────────────────┐
│  languageContext   │
│  changes           │
└────────┬───────────┘
         │
         ▼
┌────────────────────────────────┐
│  useEffect dependency triggers │
│  [slug, language]              │
└────────┬───────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│  getDetailContentByLanguage    │
│  (slug, 'th')                  │
└────────┬───────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│  Returns Thai HTML content     │
└────────┬───────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│  Component re-renders          │
│  with Thai content             │
└────────────────────────────────┘
```

---

**Visual Guide Created**: March 17, 2026  
**Purpose**: Understanding data flow in detail content architecture
