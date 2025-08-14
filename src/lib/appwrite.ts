import { Client, Storage } from "appwrite";

const client = new Client();

// Check if we're in a server environment (SSR)
if (typeof window === 'undefined') {
  // Server-side: use environment variables directly
  client
    .setEndpoint(process.env.APPWRITE_ENDPOINT!) // Your Appwrite endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID!); // Your Project ID
} else {
  // Client-side: use import.meta.env
  client
    .setEndpoint(import.meta.env.APPWRITE_ENDPOINT) // Your Appwrite endpoint
    .setProject(import.meta.env.APPWRITE_PROJECT_ID); // Your Project ID
}

export const storage = new Storage(client);
