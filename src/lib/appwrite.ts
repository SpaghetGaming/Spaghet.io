import { Client, Databases } from "appwrite";

const client = new Client();

// Check if we're in a server environment (SSR)
if (typeof window === 'undefined') {
  // Server-side: use environment variables directly
  const endpoint = process.env.VITE_APPWRITE_ENDPOINT;
  const projectId = process.env.VITE_APPWRITE_PROJECT_ID;
  
  if (!endpoint || !projectId) {
    throw new Error('Appwrite configuration missing in server environment');
  }
  
  client
    .setEndpoint(endpoint) // Your Appwrite endpoint
    .setProject(projectId); // Your Project ID
} else {
  // Client-side: use import.meta.env (need to prefix with PUBLIC_ for Astro to make them available)
  const endpoint = import.meta.env.PUBLIC_APPWRITE_ENDPOINT;
  const projectId = import.meta.env.PUBLIC_APPWRITE_PROJECT_ID;
  
  if (!endpoint || !projectId) {
    throw new Error('Appwrite configuration missing in client environment');
  }
  
  client
    .setEndpoint(endpoint) // Your Appwrite endpoint
    .setProject(projectId); // Your Project ID
}

export const databases = new Databases(client);
