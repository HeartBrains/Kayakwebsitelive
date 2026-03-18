# Khao Yai Art Forest - Data Mockup

## Overview

This directory contains comprehensive JSON mockup files representing all data structures used in the Khao Yai Art Forest website. These files are designed to facilitate the transition to a real CMS or API backend.

## File Structure

```
/data/
├── schema.json          # JSON Schema definitions for all data types
├── exhibitions.json     # Exhibition data (current, upcoming, past)
├── activities.json      # Activities and events data
├── team.json           # Team members, advisors, and donors
├── press.json          # Press releases and media coverage
├── artists.json        # Artists in residence data
└── README.md           # This file
```

## Data Files

### 1. schema.json
JSON Schema definitions for all data types. Use this as a reference for the expected structure when connecting to a real data source.

**Key schemas:**
- `BilingualText` - Standard bilingual content structure
- `Exhibition` - Complete exhibition data structure
- `Activity` - Activity/event data structure
- `TeamMember` - Team member information
- `Artist` - Artist in residence data
- `PressItem` - Press release structure

### 2. exhibitions.json
Complete exhibition data including:
- **Current exhibitions** (8 items)
- Bilingual content (English & Thai)
- Images, galleries, and credits
- Artist and curator information
- Categories and tags
- Specifications and metadata

**Status values:** `current`, `upcoming`, `past`

### 3. activities.json
Activities and events data including:
- **Current activity** (K-BAR Experience)
- **Example activities** (4 additional examples)
- Bilingual content
- Event schedules and types
- Categories and classifications

**Activity types:** Events, Gastronomy, Workshops, Talks, Public Programs

### 4. team.json
Complete team structure:
- **Founder** (Marisa Chearavanont with full bio)
- **Directors** (4 directors with bios)
- **Team Members** (23 team members by role)
- **Advisory Board** (8 members)
- **Donors** (7 donors)

All content is bilingual (English & Thai)

### 5. press.json
Press releases and media coverage:
- **10 press items**
- Dates in both English and Thai formats
- Links to PDFs and articles
- Type classification (pdf/article)

### 6. artists.json
Artist in residence data:
- **Example artists** (3 examples: past, current, upcoming)
- Full biographies (bilingual)
- Artist statements
- Image galleries
- Residency periods

## Data Schema Patterns

### Bilingual Content
All user-facing content follows a consistent bilingual pattern:

```json
{
  "title": {
    "en": "English Title",
    "th": "ชื่อภาษาไทย"
  }
}
```

### Status-First Logic
Content is organized by status (current, upcoming, past):

```json
{
  "status": "current",  // or "upcoming" or "past"
  "year": "2024"
}
```

### Image Structure
Images use direct URLs with optional galleries:

```json
{
  "featuredImage": "https://example.com/image.jpg",
  "gallery": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "imageCredits": "Photo by Photographer Name"
}
```

### Categories
Categories are bilingual arrays:

```json
{
  "categories": {
    "en": ["Sculpture", "Land Art"],
    "th": ["ประติมากรรม", "ศิลปะบนพื้นดิน"]
  }
}
```

## Connecting to Real Data

### Option 1: WordPress REST API
If using WordPress as CMS, map these structures to WordPress custom post types:

1. **Exhibitions** → Custom Post Type: `exhibition`
2. **Activities** → Custom Post Type: `activity`
3. **Team** → Custom Post Type: `team_member`
4. **Press** → Custom Post Type: `press`
5. **Artists** → Custom Post Type: `artist`

Use ACF (Advanced Custom Fields) for bilingual content and metadata.

### Option 2: Headless CMS (Contentful, Strapi, etc.)
Create content models matching the schema.json definitions:

1. Import schema.json as reference
2. Create content models for each type
3. Add bilingual fields using locale features
4. Configure API endpoints

### Option 3: Custom API
Build a custom API matching these JSON structures:

**Endpoints:**
```
GET /api/exhibitions          - List all exhibitions
GET /api/exhibitions/:slug    - Single exhibition
GET /api/activities           - List all activities
GET /api/activities/:slug     - Single activity
GET /api/team                 - Team data
GET /api/press                - Press releases
GET /api/artists              - Artists in residence
GET /api/artists/:slug        - Single artist
```

**Query Parameters:**
- `status` - Filter by status (current/upcoming/past)
- `lang` - Language preference (en/th)
- `limit` - Pagination limit
- `offset` - Pagination offset

## Implementation Guide

### 1. Data Adapter Layer
Create an adapter layer in `/utils/dataAdapter.ts` to transform API responses:

```typescript
import { Exhibition } from './exhibitionsDataNew';

export async function fetchExhibitions(status?: string): Promise<Exhibition[]> {
  // Replace with actual API call
  const response = await fetch('/api/exhibitions?status=' + status);
  const data = await response.json();
  
  // Transform if needed
  return data.exhibitions;
}
```

### 2. Update Existing Data Files
Replace hardcoded data in:
- `/utils/exhibitionsDataNew.ts`
- `/utils/activitiesDataNew.ts`
- `/utils/teamDataBilingual.ts`
- `/utils/pressDataBilingual.ts`
- `/utils/residencyData.ts`

### 3. Environment Configuration
Add API configuration to `.env`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.khaoyaiartforest.com
NEXT_PUBLIC_API_KEY=your-api-key
```

### 4. Caching Strategy
Implement caching for better performance:

```typescript
// Cache API responses for 5 minutes
export async function fetchWithCache(url: string) {
  const cached = sessionStorage.getItem(url);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < 300000) { // 5 minutes
      return data;
    }
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  sessionStorage.setItem(url, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
  
  return data;
}
```

## Field Mapping Reference

### Exhibition Fields
| JSON Field | CMS Field | Type | Required |
|------------|-----------|------|----------|
| id | ID | string | ✓ |
| slug | Slug | string | ✓ |
| title | Title | bilingual | ✓ |
| artist | Artist | bilingual | ✓ |
| curator | Curator | bilingual | ✓ |
| dateDisplay | Date Display | bilingual | ✓ |
| status | Status | select | ✓ |
| year | Year | string | ✓ |
| categories | Categories | bilingual array | ✓ |
| featuredImage | Featured Image | URL | ✓ |
| gallery | Gallery | URL array | - |
| imageCredits | Image Credits | string | ✓ |
| listingSummary | Listing Summary | bilingual | ✓ |
| tags | Tags | bilingual array | - |
| specifications | Specifications | bilingual object | - |

### Activity Fields
| JSON Field | CMS Field | Type | Required |
|------------|-----------|------|----------|
| id | ID | string | ✓ |
| slug | Slug | string | ✓ |
| title | Title | bilingual | ✓ |
| artist | Artist | bilingual | - |
| dateDisplay | Date Display | bilingual | ✓ |
| status | Status | select | ✓ |
| year | Year | string | ✓ |
| categories | Categories | bilingual array | ✓ |
| featuredImage | Featured Image | URL | ✓ |
| gallery | Gallery | URL array | - |
| imageCredits | Image Credits | string | - |
| listingSummary | Listing Summary | bilingual | ✓ |
| tags | Tags | bilingual array | - |
| typeLabel | Type Label | bilingual | - |

## Validation

Use the schema.json file to validate data:

```typescript
import Ajv from 'ajv';
import schema from './schema.json';

const ajv = new Ajv();
const validate = ajv.compile(schema.definitions.Exhibition);

function validateExhibition(data: any): boolean {
  const valid = validate(data);
  if (!valid) {
    console.error(validate.errors);
    return false;
  }
  return true;
}
```

## Migration Checklist

- [ ] Choose CMS/API platform
- [ ] Create content models based on schema.json
- [ ] Import existing data from JSON files
- [ ] Set up API endpoints
- [ ] Create data adapter layer
- [ ] Update component data fetching
- [ ] Implement caching strategy
- [ ] Test bilingual content
- [ ] Verify search index integration
- [ ] Update documentation

## Notes

- All dates should be stored in ISO 8601 format for consistency
- Image URLs should use CDN for performance
- Bilingual content should always include both languages
- Status field is critical for content organization
- Slug must be unique across all content types
- Gallery arrays can be empty but should exist

## Support

For questions about the data structure or migration process, refer to:
- `/utils/types.ts` - TypeScript type definitions
- `/utils/dataAdapter.ts` - Data transformation utilities
- `/utils/searchData.ts` - Search index implementation

---

**Last Updated:** March 18, 2026  
**Version:** 1.0.0
