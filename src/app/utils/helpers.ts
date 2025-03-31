// const FOLDER_ID = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_BIRTHDAY_FOLDER_ID!;

// Define an explicit type for the API response
interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
}

interface GoogleDriveApiResponse {
  files: GoogleDriveFile[];
}

export async function fetchImagesFromDrive(
  folderId: string,
): Promise<string[]> {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY!;

  if (!folderId || !API_KEY) {
    console.error("🚨 Missing API key or folder ID");
    return [];
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?q="${folderId}"+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`,
    );

    // Ensure the response is parsed as a defined structure
    const data = (await res.json()) as GoogleDriveApiResponse;

    if (!data.files || data.files.length === 0) {
      console.warn("🚨 No images found in the folder.");
      return [];
    }

    return data.files
      .filter((file) => file.mimeType.startsWith("image/")) // Ensure only image files are selected
      .map((file) => `https://drive.google.com/uc?id=${file.id}`);
  } catch (error) {
    console.error("🚨 Error fetching images:", error);
    return [];
  }
}
