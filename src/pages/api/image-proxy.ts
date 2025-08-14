import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  // Get the bucket ID and file ID from the URL parameters
  const { bucketId, fileId } = params;
  
  // Validate that we have required parameters
  if (!bucketId || !fileId) {
    return new Response(
      JSON.stringify({ error: "Missing bucketId or fileId" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Get the Appwrite endpoint and project ID from environment variables
    const endpoint = process.env.APPWRITE_ENDPOINT;
    const projectId = process.env.APPWRITE_PROJECT_ID;
    
    if (!endpoint || !projectId) {
      return new Response(
        JSON.stringify({ error: "Appwrite configuration missing" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Construct the Appwrite storage URL
    const appwriteUrl = `${endpoint}/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
    
    // Fetch the image from Appwrite storage
    const response = await fetch(appwriteUrl, {
      method: "GET",
      headers: {
        "Accept": "image/*"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    // Get the image content type
    const contentType = response.headers.get("content-type") || "image/jpeg";
    
    // Return the image with proper headers
    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error("Error proxying image from Appwrite:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch image" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
