import { Client, Databases, Storage } from "appwrite";
import type { Models } from "appwrite";
import { databases, storage } from "./appwrite"; // Import the already initialized databases and storage instances
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
  dateEnd: Date | string;
};

export type LegalDocument = Models.Document & {
  title: string;
  date: Date;
  content: string;
  contentHtml?: string; // HTML version of the content
};


// Collection IDs - these should be configured based on your Appwrite setup
const BLOG_COLLECTION_ID = process.env.VITE_APPWRITE_BLOG_COLLECTION_ID || "blog";
const PROJECTS_COLLECTION_ID = process.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID || "project";
const WORK_COLLECTION_ID = process.env.VITE_APPWRITE_WORK_COLLECTION_ID || "work";
const LEGAL_COLLECTION_ID = process.env.VITE_APPWRITE_LEGAL_COLLECTION_ID || "legal";

// Database ID - should be configured based on your Appwrite setup
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || "main";


/**
 * Get blog posts from Appwrite database
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await databases.listDocuments<BlogPost>(
      DATABASE_ID,
      BLOG_COLLECTION_ID,
      [
        // Only fetch published posts (not drafts)
        // This filter will need to be adjusted based on how you store draft status
        // For now, we'll fetch all and filter client-side or in Appwrite queries
      ]
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
 * Get a specific blog post by ID
 */
export async function getBlogPostById(id: string): Promise<BlogPost> {
  try {
    const response = await databases.getDocument<BlogPost>(
      DATABASE_ID,
      BLOG_COLLECTION_ID,
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
 * Get all available blog templates
 */
export async function getBlogTemplates(): Promise<Array<{ id: string; name: string; slug: string }>> {
  // This is a static list of templates for now, but could be fetched from Appwrite
  return [
    { id: "default", name: "Default", slug: "default" },
    { id: "feature", name: "Feature", slug: "feature" },
    { id: "news", name: "News", slug: "news" }
  ];
}

/**
 * Get projects from Appwrite database
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await databases.listDocuments<Project>(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      [
        // Only fetch published projects (not drafts)
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
 * Get a specific project by ID
 */
export async function getProjectById(id: string): Promise<Project> {
  try {
    const response = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
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
      DATABASE_ID,
      WORK_COLLECTION_ID
    );
    
    return response.documents;
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
      DATABASE_ID,
      LEGAL_COLLECTION_ID
    );
    
    return response.documents;
  } catch (error) {
    console.error("Error fetching legal documents:", error);
    throw new Error("Failed to fetch legal documents");
  }
}

/**
 * Create a new blog post
 */
export async function createBlogPost(postData: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  try {
    // Validate required fields
    if (!postData.title || !postData.content) {
      throw new Error("Title and content are required for blog posts");
    }

    const response = await databases.createDocument<BlogPost>(
      DATABASE_ID,
      BLOG_COLLECTION_ID,
      "unique()",
      postData
    );

    // Convert markdown content to HTML
    return {
      ...response,
      contentHtml: convertMarkdownToHTML(response.content)
    };
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw new Error("Failed to create blog post");
  }
}


/**
 * Update an existing blog post
 */
export async function updateBlogPost(id: string, postData: Partial<BlogPost>): Promise<BlogPost> {
  try {
    // Validate that we have data to update
    if (!postData || Object.keys(postData).length === 0) {
      throw new Error("No data provided for update");
    }

    const response = await databases.updateDocument<BlogPost>(
      DATABASE_ID,
      BLOG_COLLECTION_ID,
      id,
      postData
    );

    // Convert markdown content to HTML if content was updated
    if (postData.content !== undefined) {
      return {
        ...response,
        contentHtml: convertMarkdownToHTML(response.content)
      };
    }

    return response;
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw new Error("Failed to update blog post");
  }
}


/**
 * Delete a blog post
 */
export async function deleteBlogPost(id: string): Promise<void> {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      BLOG_COLLECTION_ID,
      id
    );
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw new Error("Failed to delete blog post");
  }
}

/**
 * Upload a blog post image
 */
export async function uploadBlogImage(file: File): Promise<string> {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error("Only image files are allowed for blog images");
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image file size exceeds 5MB limit");
    }

    const response = await storage.createFile(
      "blog-images", // bucket ID
      "unique()",
      file
    );

    return response.$id;
  } catch (error) {
    console.error("Error uploading blog image:", error);
    throw new Error("Failed to upload blog image");
  }
}

/**
 * Create a new project
 */
export async function createProject(projectData: Omit<Project, 'id'>): Promise<Project> {
  try {
    // Validate required fields
    if (!projectData.title || !projectData.content) {
      throw new Error("Title and content are required for projects");
    }

    const response = await databases.createDocument<Project>(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      "unique()",
      projectData
    );

    // Convert markdown content to HTML
    return {
      ...response,
      contentHtml: convertMarkdownToHTML(response.content)
    };
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }
}


/**
 * Update an existing project
 */
export async function updateProject(id: string, projectData: Partial<Project>): Promise<Project> {
  try {
    // Validate that we have data to update
    if (!projectData || Object.keys(projectData).length === 0) {
      throw new Error("No data provided for update");
    }

    const response = await databases.updateDocument<Project>(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      id,
      projectData
    );

    // Convert markdown content to HTML if content was updated
    if (projectData.content !== undefined) {
      return {
        ...response,
        contentHtml: convertMarkdownToHTML(response.content)
      };
    }

    return response;
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error("Failed to update project");
  }
}


/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<void> {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      id
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project");
  }
}

/**
 * Upload a project image
 */
export async function uploadProjectImage(file: File): Promise<string> {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error("Only image files are allowed for project images");
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image file size exceeds 5MB limit");
    }

    const response = await storage.createFile(
      "project-images", // bucket ID
      "unique()",
      file
    );

    return response.$id;
  } catch (error) {
    console.error("Error uploading project image:", error);
    throw new Error("Failed to upload project image");
  }
}

/**
 * Create a new work experience
 */
export async function createWorkExperience(workData: Omit<WorkExperience, 'id'>): Promise<WorkExperience> {
  try {
    // Validate required fields
    if (!workData.company || !workData.role) {
      throw new Error("Company and role are required for work experiences");
    }

    const response = await databases.createDocument<WorkExperience>(
      DATABASE_ID,
      WORK_COLLECTION_ID,
      "unique()",
      workData
    );

    return response;
  } catch (error) {
    console.error("Error creating work experience:", error);
    throw new Error("Failed to create work experience");
  }
}

/**
 * Update an existing work experience
 */
export async function updateWorkExperience(id: string, workData: Partial<WorkExperience>): Promise<WorkExperience> {
  try {
    // Validate that we have data to update
    if (!workData || Object.keys(workData).length === 0) {
      throw new Error("No data provided for update");
    }

    const response = await databases.updateDocument<WorkExperience>(
      DATABASE_ID,
      WORK_COLLECTION_ID,
      id,
      workData
    );

    return response;
  } catch (error) {
    console.error("Error updating work experience:", error);
    throw new Error("Failed to update work experience");
  }
}

/**
 * Delete a work experience
 */
export async function deleteWorkExperience(id: string): Promise<void> {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      WORK_COLLECTION_ID,
      id
    );
  } catch (error) {
    console.error("Error deleting work experience:", error);
    throw new Error("Failed to delete work experience");
  }
}

/**
 * Create a new legal document
 */
export async function createLegalDocument(docData: Omit<LegalDocument, 'id'>): Promise<LegalDocument> {
  try {
    // Validate required fields
    if (!docData.title || !docData.content) {
      throw new Error("Title and content are required for legal documents");
    }

    const response = await databases.createDocument<LegalDocument>(
      DATABASE_ID,
      LEGAL_COLLECTION_ID,
      "unique()",
      docData
    );

    // Convert markdown content to HTML
    return {
      ...response,
      contentHtml: convertMarkdownToHTML(response.content)
    };
  } catch (error) {
    console.error("Error creating legal document:", error);
    throw new Error("Failed to create legal document");
  }
}


/**
 * Update an existing legal document
 */
export async function updateLegalDocument(id: string, docData: Partial<LegalDocument>): Promise<LegalDocument> {
  try {
    // Validate that we have data to update
    if (!docData || Object.keys(docData).length === 0) {
      throw new Error("No data provided for update");
    }

    const response = await databases.updateDocument<LegalDocument>(
      DATABASE_ID,
      LEGAL_COLLECTION_ID,
      id,
      docData
    );

    // Convert markdown content to HTML if content was updated
    if (docData.content !== undefined) {
      return {
        ...response,
        contentHtml: convertMarkdownToHTML(response.content)
      };
    }

    return response;
  } catch (error) {
    console.error("Error updating legal document:", error);
    throw new Error("Failed to update legal document");
  }
}


/**
 * Delete a legal document
 */
export async function deleteLegalDocument(id: string): Promise<void> {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      LEGAL_COLLECTION_ID,
      id
    );
  } catch (error) {
    console.error("Error deleting legal document:", error);
    throw new Error("Failed to delete legal document");
  }
}

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
