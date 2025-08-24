import type { Models, } from "appwrite";
import  { Query } from "appwrite";
import { databases, } from "./appwrite"; // Import the already initialized databases instances
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";


// We're using the storage instance from appwrite.ts which is properly initialized
// This file only contains service functions and types

/**
 * Convert markdown content to HTML
 */
export function convertMarkdownToHTML(markdown: string): string {
  if (!markdown) return "";
  
  try {
    const file = remark()
      .use(remarkRehype)
      .use(rehypeStringify)
      .processSync(markdown);
    
    return file.toString();
  } catch (error) {
    console.error("Error converting markdown to HTML:", error);
    return markdown; // Return raw markdown if conversion fails
  }
}


// Types for our collections
export type BlogPost = Models.Document & {
  title: string;
  summary: string;
  date: Date;
  tags: string[];
  draft: boolean;
  content: string;
  contentHtml?: string; // HTML version of the content
  image?: string; // File ID for the featured image
  template: string; // e.g., "default", "feature", "news"
  featured: boolean;
};


export type Project = Models.Document & {
  title: string;
  summary: string;
  date: Date;
  tags: string[];
  draft: boolean;
  demoUrl?: string;
  repoUrl?: string;
  content: string;
  contentHtml?: string; // HTML version of the content
  image?: string; // File ID for the featured image
};


export type WorkExperience = Models.Document & {
  company: string;
  role: string;
  dateStart: Date;
  content: string;
  contentHtml?: string; // HTML version of the content
  dateEnd: Date | string;
};

export type LegalDocument = Models.Document & {
  title: string;
  date: Date;
  content: string;
  contentHtml?: string; // HTML version of the content
};


// Define a unified type for search results
export type SearchEntry = BlogPost | Project;

// Collection IDs - these should be configured based on your Appwrite setup

let blogCollection = '', projectsCollection = '', workCollection = '', legalCollection = '', databaseID = '';

// Check if we're in a server environment (SSR)
if (typeof window === 'undefined') {
  // Server-side: use environment variables directly
  blogCollection = process?.env?.VITE_APPWRITE_BLOG_COLLECTION_ID || 'blog';
  projectsCollection = process?.env?.VITE_APPWRITE_PROJECTS_COLLECTION_ID || "projects";
  workCollection = process?.env?.VITE_APPWRITE_WORK_COLLECTION_ID || "work";
  legalCollection = process?.env?.VITE_APPWRITE_LEGAL_COLLECTION_ID || "legal";
  databaseID = process.env.VITE_APPWRITE_DATABASE_ID || "main";
} else {
  blogCollection = import.meta.env.PUBLIC_APPWRITE_BLOG_COLLECTION_ID || 'blog';
  projectsCollection = import.meta.env.PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID || "projects";
  workCollection = import.meta.env.PUBLIC_APPwrite_WORK_COLLECTION_ID || "work";
  legalCollection = import.meta.env.PUBLIC_APPWRITE_LEGAL_COLLECTION_ID || "legal";
  databaseID = import.meta.env.PUBLIC_APPWRITE_DATABASE_ID || "main";
}

/**
 * Get blog posts from Appwrite database
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await databases.listDocuments<BlogPost>(
      databaseID,
      blogCollection
    );
    
    // Convert markdown content to HTML for each post
    const postsWithHtml = response.documents.map(post => ({
      ...post,
      contentHtml: convertMarkdownToHTML(post.content)
    }));
    
    return postsWithHtml;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts");
  }
}


/**
 * Get paginated blog posts from Appwrite database
 */
export async function getBlogPostsPaginated(page: number, limit: number): Promise<{ posts: BlogPost[], total: number }> {
  try {
    // For Appwrite SDK, the correct way to call listDocuments with pagination
    const response = await databases.listDocuments<BlogPost>(
      databaseID,
      blogCollection,
      [
        // Only fetch published posts (not drafts)
        Query.equal("draft", false),
        Query.orderDesc('date')
      ]
    );
    
    // Apply pagination manually since Appwrite SDK might not support offset/limit directly in this version
    const paginatedPosts = response.documents.slice((page - 1) * limit, page * limit);
    
    // Convert markdown content to HTML for each post
    const postsWithHtml = paginatedPosts.map(post => ({
      ...post,
      contentHtml: convertMarkdownToHTML(post.content)
    }));
    
    return {
      posts: postsWithHtml,
      total: response.total
    };
  } catch (error) {
    console.error("Error fetching paginated blog posts:", error);
    throw new Error("Failed to fetch paginated blog posts");
  }
}


/**
 * Get a specific blog post by ID
 */
export async function getBlogPostById(id: string): Promise<BlogPost> {
  try {
    const response = await databases.getDocument<BlogPost>(
      databaseID,
      blogCollection,
      id
    );
    
    // Convert markdown content to HTML
    return {
      ...response,
      contentHtml: convertMarkdownToHTML(response.content)
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw new Error("Failed to fetch blog post");
  }
}

/**
 * Get projects from Appwrite database
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await databases.listDocuments<Project>(
      databaseID,
      projectsCollection,
      [
        // Only fetch published projects (not drafts)
        Query.equal("draft", false),
        Query.orderDesc('date')
      ]
    );
    
    // Convert markdown content to HTML for each project
    const projectsWithHtml = response.documents.map(project => ({
      ...project,
      contentHtml: convertMarkdownToHTML(project.content)
    }));
    
    return projectsWithHtml;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}


/**
 * Get paginated projects from Appwrite database
 */
export async function getProjectsPaginated(page: number, limit: number): Promise<{ posts: Project[], total: number }> {
  try {
    const response = await databases.listDocuments<Project>(
      databaseID,
      projectsCollection,
      [
        // Only fetch published projects (not drafts)
        Query.equal("draft", false),
        Query.orderDesc('date')
      ]
    );
    
    // Apply pagination manually since Appwrite SDK might not support offset/limit directly in this version
    const paginatedPosts = response.documents.slice((page - 1) * limit, page * limit);
    
    // Convert markdown content to HTML for each project
    const projectsWithHtml = paginatedPosts.map(project => ({
      ...project,
      contentHtml: convertMarkdownToHTML(project.content)
    }));
    
    return {
      posts: projectsWithHtml,
      total: response.total
    };
  } catch (error) {
    console.error("Error fetching paginated projects:", error);
    throw new Error("Failed to fetch paginated projects");
  }
}


/**
 * Get a specific project by ID
 */
export async function getProjectById(id: string): Promise<Project> {
  try {
    const response = await databases.getDocument<Project>(
      databaseID,
      projectsCollection,
      id
    );
    
    // Convert markdown content to HTML
    return {
      ...response,
      contentHtml: convertMarkdownToHTML(response.content)
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error("Failed to fetch project");
  }
}


/**
 * Get work experiences from Appwrite database
 */
export async function getWorkExperiences(): Promise<WorkExperience[]> {
  try {
    const response = await databases.listDocuments<WorkExperience>(
      databaseID,
      workCollection
    );

    // Convert markdown content to HTML for each project
    return response.documents.map(work => ({
      ...work,
      contentHtml: convertMarkdownToHTML(work.content)
    }));
  } catch (error) {
    console.error("Error fetching work experiences:", error);
    throw new Error("Failed to fetch work experiences");
  }
}

/**
 * Get legal documents from Appwrite database
 */
export async function getLegalDocuments(): Promise<LegalDocument[]> {
  try {
    const response = await databases.listDocuments<LegalDocument>(
      databaseID,
      legalCollection
    );
    
    return response.documents;
  } catch (error) {
    console.error("Error fetching legal documents:", error);
    throw new Error("Failed to fetch legal documents");
  }
}

/**
 * Perform a search across blog posts and projects using Appwrite SDK
 */
export async function searchContent(query: string): Promise<{ posts: BlogPost[], projects: Project[] }> {
  try {
    // Search in blog collection for the query term
    const blogResponse = await databases.listDocuments<BlogPost>(
      databaseID,
      blogCollection,
      [
        Query.and([
          Query.equal("draft", false),
          Query.or([
            Query.search("title", query),
            Query.search("summary", query),
            Query.search("content", query)
          ])
        ]),
        Query.orderDesc('date')
      ]
    );

    // Search in projects collection for the query term
    const projectResponse = await databases.listDocuments<Project>(
      databaseID,
      projectsCollection,
      [
        Query.and([
          Query.equal("draft", false),
          Query.or([
            Query.search("title", query),
            Query.search("summary", query),
            Query.search("content", query)
          ])
        ]),
        Query.orderDesc('date')
      ]
    );

    // Convert markdown content to HTML for blog posts
    const blogPostsWithHtml = blogResponse.documents.map(post => ({
      ...post,
      contentHtml: convertMarkdownToHTML(post.content)
    }));

    // Convert markdown content to HTML for projects
    const projectsWithHtml = projectResponse.documents.map(project => ({
      ...project,
      contentHtml: convertMarkdownToHTML(project.content)
    }));

    return {
      posts: blogPostsWithHtml,
      projects: projectsWithHtml
    };
  } catch (error) {
    console.error("Error performing search:", error);
    // More specific error handling for Appwrite errors
    if (error instanceof Error) {
      throw new Error(`Search failed: ${error.message}`);
    }
    throw new Error("Search failed due to an unknown error");
  }
}

// Remove the duplicate function - keep only the original searchContent function
// The original searchContent function is already correctly implemented and should be used


/**
 * Get a public URL for a file
 */
export function getFileUrl(bucketId: string, fileId: string): string {
  return `${process.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.VITE_APPWRITE_PROJECT_ID}`;
}

/**
 * Get a preview URL for a file (thumb or preview)
 */
export function getFilePreviewUrl(bucketId: string, fileId: string, type: "thumb" | "preview"): string {
  return `${process.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.VITE_APPWRITE_PROJECT_ID}&mode=${type}`;
}

/**
 * Get a download URL for a file
 */
export function getFileDownloadUrl(bucketId: string, fileId: string): string {
  return `${process.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/download?project=${process.env.VITE_APPWRITE_PROJECT_ID}`;
}
