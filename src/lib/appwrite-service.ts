import { Client, Databases, Storage } from "appwrite";
import type { Models } from "appwrite";
import { databases, storage } from "./appwrite"; // Import the already initialized databases and storage instances

// We're using the storage instance from appwrite.ts which is properly initialized
// This file only contains service functions and types

// Types for our collections
export type BlogPost = Models.Document & {
  title: string;
  summary: string;
  date: Date;
  tags: string[];
  draft: boolean;
  content: string;
  image?: string; // File ID for the featured image
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
    
    return response.documents;
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
    
    return response;
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
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      [
        // Only fetch published projects (not drafts)
      ]
    );
    
    return response.documents;
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
    
    return response;
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
 * Get a specific legal document by ID
 */
