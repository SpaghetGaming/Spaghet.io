import type { Models } from "appwrite";
import type { CollectionEntry } from "astro:content";

// Types for our collections that match Appwrite document structure
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

// Define the proper CollectionEntry format for blog and projects
export type BlogCollectionEntry = CollectionEntry<"blog"> & {
  id: string;
  slug: string;
  body: string;
  collection: "blog";
  data: {
    title: string;
    summary: string;
    date: Date;
    tags: string[];
    draft: boolean;
    content: string;
  };
  render: () => Promise<{
    Content: () => any;
    headings: any[];
    remarkPluginFrontmatter: any;
  }>;
};

export type ProjectCollectionEntry = CollectionEntry<"projects"> & {
  id: string;
  slug: string;
  body: string;
  collection: "projects";
  data: {
    title: string;
    summary: string;
    date: Date;
    tags: string[];
    draft: boolean;
    demoUrl?: string;
    repoUrl?: string;
    content: string;
  };
  render: () => Promise<{
    Content: () => any;
    headings: any[];
    remarkPluginFrontmatter: any;
  }>;
};
