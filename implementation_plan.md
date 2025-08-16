# Implementation Plan

## Overview
The goal is to migrate the website's content from static markdown files to Appwrite database collections, removing the automatic migration logic. This involves updating all pages and components to fetch data directly from Appwrite instead of using Astro's content collections. The existing Appwrite integration infrastructure will be leveraged to provide a seamless transition.

## Types
The implementation will modify existing types to align with Appwrite document structure while maintaining compatibility with existing components. We'll update the type definitions in appwrite-service.ts to match the actual data schema stored in Appwrite collections.

## Files
- Remove src/lib/appwrite-data-import.ts (migration logic)
- Remove src/lib/appwrite-data-import.ts (migration logic)
- Update src/lib/appwrite-service.ts (maintain service functions but remove import functions)
- Update src/pages/projects/index.astro (fetch from Appwrite instead of Astro collections)
- Update src/pages/blog/index.astro (fetch from Appwrite instead of Astro collections)
- Update src/pages/work/index.astro (fetch from Appwrite instead of Astro collections)
- Update src/pages/blog/[...slug].astro (fetch from Appwrite instead of Astro collections)
- Update src/pages/projects/[...slug].astro (fetch from Appwrite instead of Astro collections)
- Update src/components/Projects.tsx and src/components/Blog.tsx to work with Appwrite data directly

## Functions
- Remove import functions from appwrite-service.ts:
  - importBlogPostsToAppwrite()
  - importProjectsToAppwrite() 
  - importWorkExperiencesToAppwrite()
  - importLegalDocumentsToAppwrite()
  - importAllContentToAppwrite()
- Keep existing data fetching functions:
  - getBlogPosts()
  - getBlogPostById()
  - getProjects()
  - getProjectById()
  - getWorkExperiences()
  - getLegalDocuments()
  - getLegalDocumentById()
  - getFileUrl()
  - getFilePreviewUrl()
  - getFileDownloadUrl()

## Classes
- Remove the AppwriteDataImporter class from appwrite-data-import.ts
- Keep existing type definitions in appwrite-service.ts

## Dependencies
- No new dependencies needed, but ensure environment variables are properly configured for Appwrite

## Testing
- Verify all pages load content from Appwrite database
- Ensure filtering functionality works with Appwrite data
- Test individual post/project pages
- Confirm file URL generation works correctly

## Implementation Order
1. Remove migration-related files and functions
2. Update service layer to ensure proper data fetching from Appwrite
3. Update project index page to fetch projects from Appwrite
4. Update blog index page to fetch posts from Appwrite
5. Update work experience page to fetch experiences from Appwrite
6. Update individual blog post pages
7. Update individual project pages
8. Test all functionality
