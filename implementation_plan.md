# Implementation Plan for Spaghet.io Website


## 1. Layout Files Fix (astro:content to Appwrite Data Types)
**Issue:** Astro layout files are using `astro:content` types instead of Appwrite data types causing "entry" attribute errors.

## 2. Dark Mode Styling Improvements
**Issues:**
- Spaghetti theme is too hard to read in dark mode
- Inconsistent text colors across components and layouts
- Border on hero image is too light

## 3. Search Function Enhancement (Appwrite SDK Integration)
**Status: Partially Complete**
The search component has already been updated to use Appwrite data instead of Fuse.js client-side search, but needs refinement to properly utilize Appwrite's querying capabilities.

## 4. Pagination Implementation for Blogs and Projects Pages
**Requirements:**
- Implement pagination on both blog and projects pages
- Allow variable item counts (10, 20, 50 items per page)
- Use Appwrite SDK with offset/limit parameters
- Maintain existing filtering functionality

## 5. Technical Implementation Details

### A. Layout Files Fix Strategy
1. **Update `src/layouts/ArticleBottomLayout.astro`**:
   - Change from `CollectionEntry<"blog"> | CollectionEntry<"projects">` to Appwrite data types
   - Ensure compatibility with Appwrite document structure
   - Fix the entry attribute errors

### B. Dark Mode Improvements
1. **Enhance `src/styles/global.css`**:
   - Improve text color contrast for dark mode readability
   - Adjust border colors for better visibility
   - Create consistent styling across all components

### C. Search Function Enhancement
1. **Refine `src/components/Search.tsx`**:
   - Implement proper Appwrite SDK search queries
   - Add server-side filtering instead of client-side
   - Maintain existing UI functionality

### D. Pagination Implementation Strategy
1. **Modify `src/pages/blog/index.astro`**:
   - Add pagination parameters (page, limit)
   - Implement Appwrite SDK with offset/limit queries
   - Create pagination controls with 10/20/50 item options
   - Maintain existing tag filtering

2. **Modify `src/pages/projects/index.astro`**:
   - Apply same pagination approach as blog page
   - Ensure consistent UI/UX between both pages

3. **Update Appwrite Service Functions**:
   - Add pagination support to getBlogPosts and getProjects functions
   - Implement proper offset/limit parameter handling


## 6. Implementation Steps Timeline


### Phase 1: Layout Files Fix
- [ ] Update ArticleBottomLayout.astro to use Appwrite data types
- [ ] Update ArticleTopLayout.astro to use Appwrite data types
- [ ] Ensure all layout components are compatible with Appwrite data structure
- [ ] Remove all uses and references to astro:content. No longer using astro content.

### Phase 2: Dark Mode Improvements
- [ ] Improve text color contrast in global.css
- [ ] Adjust border colors for better visibility
- [ ] Test dark mode readability across all components

### Phase 3: Search Function Enhancement
- [ ] Implement proper Appwrite SDK search functionality
- [ ] Remove client-side filtering where possible
- [ ] Ensure search works with Appwrite data types

### Phase 4: Pagination Implementation (Blog & Projects Pages)
- [ ] Modify blog/index.astro to add pagination support
- [ ] Modify projects/index.astro to add pagination support  
- [ ] Update appwrite-service.ts with pagination functions
- [ ] Implement page navigation controls

## 7. Technical Considerations

1. **Appwrite Query Parameters**: Use `offset` and `limit` for pagination
2. **Type Safety**: Maintain proper TypeScript types throughout
3. **Performance**: Optimize queries to minimize API calls
4. **User Experience**: Ensure smooth pagination transitions
5. **Backward Compatibility**: Maintain existing functionality while adding new features

## 8. Files to Modify
1. `src/layouts/ArticleBottomLayout.astro` - Fix data type issues
2. `src/layouts/ArticleTopLayout.astro` - Fix data type issues
3. `src/styles/global.css` - Improve dark mode styling
4. `src/components/Search.tsx` - Enhance search functionality
5. `src/pages/blog/index.astro` - Add pagination support
6. `src/pages/projects/index.astro` - Add pagination support  
7. `src/lib/appwrite-service.ts` - Add pagination functions

## 9. Testing Requirements
- Verify pagination works correctly with 10/20/50 items
- Test all filtering and sorting functionality
- Ensure dark mode readability is improved
- Validate that search returns correct Appwrite data
- Confirm layout files work with Appwrite data types
