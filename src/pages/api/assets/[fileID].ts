import { type APIRoute } from 'astro';
import { getFileUrl, getFilePreviewUrl, getFileDownloadUrl } from '../../../lib/appwrite-service.ts';

export const GET: APIRoute = async ({ params, request }) => {
  const { fileID } = params;
  
  // Validate that we have a file ID
  if (!fileID) {
    return new Response(
      JSON.stringify({ error: 'File ID is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Get the bucket ID from environment variables
    const bucketId = process.env.VITE_APPWRITE_BUCKET_ID;
    
    if (!bucketId) {
      return new Response(
        JSON.stringify({ error: 'Bucket ID is not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse query parameters for preview type
    const url = new URL(request.url);
    const type = url.searchParams.get('type') as "thumb" | "preview" | null;
    
    let fileUrl: string;
    
    // Determine the appropriate URL based on query parameter or default to view
    if (type === 'thumb' || type === 'preview') {
      fileUrl = getFilePreviewUrl(bucketId, fileID, type);
    } else {
      // Default to regular view URL
      fileUrl = getFileUrl(bucketId, fileID);
    }

    // Return a redirect response to the file URL
    return new Response(
      null,
      {
        status: 302,
        headers: {
          'Location': fileUrl
        }
      }
    );
  } catch (error) {
    console.error('Error fetching file:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch file' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Handle HEAD requests for preflight checks
export const HEAD: APIRoute = async ({ params }) => {
  const { fileID } = params;
  
  if (!fileID) {
    return new Response(
      null,
      { status: 400 }
    );
  }

  try {
    // Get the bucket ID from environment variables
    const bucketId = process.env.VITE_APPWRITE_BUCKET_ID;
    
    if (!bucketId) {
      return new Response(
        null,
        { status: 500 }
      );
    }

    // For HEAD requests, we just validate that the file URL can be generated
    // This is a basic check - in production you might want to actually verify
    // that the file exists on Appwrite
    const fileUrl = getFileUrl(bucketId, fileID);
    
    // Return a successful response (we don't actually need to return anything specific for HEAD)
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error('Error checking file:', error);
    return new Response(null, { status: 500 });
  }
};
