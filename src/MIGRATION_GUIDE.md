# Migration Guide: Using New Data Architecture
## Step-by-Step Guide for Updating Pages

---

## 📋 Overview

This guide shows how to migrate existing pages from the legacy `mockDataBilingual` structure to the new data architecture with status-first filtering and modern bilingual support.

---

## 🎯 Quick Reference

### Old Pattern (Legacy)
```typescript
import { MOCK_POSTS_BILINGUAL } from '../../utils/mockDataBilingual';

const allPosts = Object.values(MOCK_POSTS_BILINGUAL);
const currentExhibitions = allPosts.filter(item => 
  item.en.type === 'exhibition' && 
  item.en.date && 
  item.en.date.includes('Permanent')
);
```

### New Pattern (Modern)
```typescript
import { getCurrentExhibitions } from '@/utils';

const { language } = useLanguage();
const currentExhibitions = getCurrentExhibitions(language);
```

---

## 📝 Migration Steps

### Step 1: Update Imports

**Before:**
```typescript
import { MOCK_POSTS_BILINGUAL } from '../../utils/mockDataBilingual';
```

**After:**
```typescript
import { 
  getCurrentExhibitions,
  getUpcomingExhibitions,
  getPastExhibitions
} from '@/utils';
```

---

### Step 2: Remove Manual Filtering Logic

**Before:**
```typescript
const allPosts = Object.values(MOCK_POSTS_BILINGUAL);

const currentExhibitions = allPosts.filter(item => 
  item.en.type === 'exhibition' && 
  item.en.date && item.en.date.includes('Permanent')
);

const upcomingExhibitions = allPosts.filter(item => 
  item.en.type === 'exhibition' &&
  item.en.date && item.en.date.includes('Upcoming')
);
```

**After:**
```typescript
const { language } = useLanguage();

const currentExhibitions = getCurrentExhibitions(language);
const upcomingExhibitions = getUpcomingExhibitions(language);
const pastExhibitions = getPastExhibitions(language);
```

---

### Step 3: Update Card Rendering

**Before:**
```typescript
{currentExhibitions.map((item) => (
  <div key={item.en.id} onClick={() => onNavigate?.('exhibition-detail', item.en.slug)}>
    {/* English Content */}
    {language !== 'th' && (
      <div>
        <h3>{item.en.title}</h3>
        <p>{item.en.acf?.artist}</p>
      </div>
    )}
    
    {/* Thai Content */}
    {language === 'th' && (
      <div>
        <h3>{item.th.title}</h3>
        <p>{item.th.acf?.artist}</p>
      </div>
    )}
  </div>
))}
```

**After:**
```typescript
{currentExhibitions.map((item) => (
  <div key={item.id} onClick={() => onNavigate?.('exhibition-detail', item.slug)}>
    <div className={language === 'th' ? 'leading-[1.82em]' : ''}>
      <h3>{item.title}</h3>
      <p>{item.acf?.artist}</p>
      <p className="text-gray-500">{item.date}</p>
    </div>
  </div>
))}
```

**Key Differences:**
- ✅ No more `item.en` / `item.th` - data already in selected language
- ✅ No more duplicate rendering blocks
- ✅ Simpler, cleaner code
- ✅ Thai line-height applied once at container level

---

## 🔄 Complete Example: HomePage Migration

### Before (Old Pattern)

```typescript
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../../utils/languageContext';
import { MOCK_POSTS_BILINGUAL } from '../../utils/mockDataBilingual';

export function HomePage({ onNavigate }) {
  const { language } = useLanguage();

  const allPosts = Object.values(MOCK_POSTS_BILINGUAL);
  
  const currentExhibitions = allPosts.filter(item => 
    item.en.type === 'exhibition' && 
    item.en.date && item.en.date.includes('Permanent')
  );

  return (
    <div className="px-[6vw] pt-[96px]">
      <section className="flex flex-col md:flex-row mb-32 md:mb-40">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl md:text-2xl sticky top-32">
            {language === 'th' ? 'นิทรรศการปัจจุบัน' : 'Current Exhibitions'}
          </h2>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col gap-12 md:gap-16">
          {currentExhibitions.map((item) => (
            <div key={item.en.id} onClick={() => onNavigate?.('exhibition-detail', item.en.slug)}>
              <ImageWithFallback 
                src={item.en.featuredImage.sourceUrl} 
                alt={item.en.title}
              />
              
              {language !== 'th' && (
                <div>
                  <h3>{item.en.title}</h3>
                  <p>{item.en.acf?.artist}</p>
                </div>
              )}
              
              {language === 'th' && (
                <div className="leading-[1.82em]">
                  <h3>{item.th.title}</h3>
                  <p>{item.th.acf?.artist}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

### After (New Pattern)

```typescript
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '@/utils';
import { getCurrentExhibitions } from '@/utils';

export function HomePage({ onNavigate }) {
  const { language } = useLanguage();
  const currentExhibitions = getCurrentExhibitions(language);

  return (
    <div className="px-[6vw] pt-[96px]">
      <section className="flex flex-col md:flex-row mb-32 md:mb-40">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl md:text-2xl sticky top-32">
            {language === 'th' ? 'นิทรรศการปัจจุบัน' : 'Current Exhibitions'}
          </h2>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col gap-12 md:gap-16">
          {currentExhibitions.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onNavigate?.('exhibition-detail', item.slug)}
              className="cursor-pointer group"
            >
              <ImageWithFallback 
                src={item.featuredImage?.sourceUrl || ''} 
                alt={item.title}
              />
              
              <div className={language === 'th' ? 'leading-[1.82em]' : ''}>
                <h3 className="text-lg md:text-xl">{item.title}</h3>
                <p className="text-lg md:text-xl">{item.acf?.artist}</p>
                {item.acf?.listing_summary && (
                  <p className="text-gray-500 mt-2">{item.acf.listing_summary}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

**Lines of Code Reduced**: 50 → 35 (30% reduction)  
**Complexity**: High → Low  
**Maintainability**: Medium → High

---

## 🎨 Complete Example: ExhibitionsPage Migration

### Before (Old Pattern)

```typescript
import { MOCK_POSTS_BILINGUAL } from '../../utils/mockDataBilingual';

export function ExhibitionsPage({ onNavigate, activeSection }) {
  const [activeCategory, setActiveCategory] = useState('current');
  const { language } = useLanguage();

  const allPosts = Object.values(MOCK_POSTS_BILINGUAL);
  const allExhibitions = allPosts.filter(item => item.en.type === 'exhibition');

  const currentExhibitions = allExhibitions.filter(item => 
    item.en.date && item.en.date.includes('Permanent')
  );
  
  const upcomingExhibitions = allExhibitions.filter(item => 
    item.en.date && item.en.date.includes('Upcoming')
  );

  const filteredExhibitions = activeCategory === 'current' 
    ? currentExhibitions 
    : upcomingExhibitions;

  return (
    <div>
      {/* ... navigation ... */}
      
      <div className="grid grid-cols-3 gap-8">
        {filteredExhibitions.map((item) => (
          <div key={item.en.id}>
            {/* English/Thai duplicate rendering */}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### After (New Pattern)

```typescript
import { 
  getCurrentExhibitions,
  getUpcomingExhibitions,
  getPastExhibitions
} from '@/utils';

export function ExhibitionsPage({ onNavigate, activeSection }) {
  const [activeCategory, setActiveCategory] = useState('current');
  const { language } = useLanguage();

  const currentExhibitions = getCurrentExhibitions(language);
  const upcomingExhibitions = getUpcomingExhibitions(language);
  const pastExhibitions = getPastExhibitions(language);

  const filteredExhibitions = {
    current: currentExhibitions,
    upcoming: upcomingExhibitions,
    past: pastExhibitions
  }[activeCategory];

  return (
    <div>
      {/* ... navigation ... */}
      
      <div className="grid grid-cols-3 gap-8">
        {filteredExhibitions.map((item) => (
          <div 
            key={item.id}
            className={language === 'th' ? 'leading-[1.82em]' : ''}
          >
            <h3>{item.title}</h3>
            <p>{item.acf?.artist}</p>
            <p className="text-gray-500">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🔍 Detail Page Migration

### Before (Old Pattern)

```typescript
export function ExhibitionDetailPage({ slug }) {
  const { language } = useLanguage();
  const [postData, setPostData] = useState();
  
  useEffect(() => {
    const allPosts = Object.values(MOCK_POSTS_BILINGUAL);
    const item = allPosts.find(p => p.en.slug === slug);
    
    if (item) {
      setPostData(language === 'th' ? item.th : item.en);
    }
  }, [slug, language]);
  
  // ...
}
```

### After (New Pattern)

```typescript
import { getExhibitionBySlugWithLanguage } from '@/utils';

export function ExhibitionDetailPage({ slug }) {
  const { language } = useLanguage();
  const [postData, setPostData] = useState();
  
  useEffect(() => {
    const item = getExhibitionBySlugWithLanguage(slug, language);
    setPostData(item);
  }, [slug, language]);
  
  // ...
}
```

---

## ✅ Migration Checklist

### For Each Page:

- [ ] Replace `MOCK_POSTS_BILINGUAL` import with specific helpers
- [ ] Remove `Object.values()` and manual filtering
- [ ] Use helper functions (getCurrentExhibitions, etc.)
- [ ] Pass `language` parameter to helpers
- [ ] Remove duplicate EN/TH rendering blocks
- [ ] Apply Thai line-height once at container level
- [ ] Update key from `item.en.id` to `item.id`
- [ ] Update slug from `item.en.slug` to `item.slug`
- [ ] Update field access from `item.en.title` to `item.title`
- [ ] Test both EN and TH language switching

---

## 🎯 Benefits After Migration

1. **Cleaner Code**: 30-50% fewer lines
2. **Better Performance**: Pre-filtered data, less computation
3. **Type Safety**: Full TypeScript support
4. **Maintainability**: Logic in one place (helpers)
5. **Flexibility**: Easy to add new filters
6. **Consistency**: Same patterns across all pages
7. **Search Ready**: Built-in search functions
8. **Manual Curation**: Status-first logic allows overrides

---

## 🚀 Quick Win: Update HomePage First

The HomePage is the best starting point because:
- ✅ Simple filtering needs (just current items)
- ✅ Immediate visual impact
- ✅ Sets pattern for other pages
- ✅ Easy to test

**Estimated Time**: 15 minutes  
**Lines Reduced**: ~30-40 lines  
**Complexity Reduction**: Significant

---

## 📚 Additional Resources

- **DEVELOPER_GUIDE.md** - Code patterns and examples
- **DATA_ARCHITECTURE_IMPLEMENTATION.md** - Full implementation details
- **/utils/index.ts** - All available helper functions
- **/utils/exhibitionsDataNew.ts** - Data structure reference

---

## 💡 Pro Tips

1. **Start Small**: Migrate one section at a time
2. **Test Thoroughly**: Check both EN and TH languages
3. **Use TypeScript**: Let the type system guide you
4. **Commit Often**: Small, incremental commits
5. **Keep Backward Compatibility**: Don't delete old files yet
6. **Document Changes**: Update component comments

---

**Happy Migrating! The new architecture will make your code much cleaner and more maintainable.** 🎉
