import { Client, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.APPWRITE_ENDPOINT) // Your Appwrite endpoint
  .setProject(import.meta.env.APPWRITE_PROJECT_ID); // Your Project ID

export const storage = new Storage(client);
