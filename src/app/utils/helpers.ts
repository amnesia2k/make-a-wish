const FOLDER_ID = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_BIRTHDAY_FOLDER_ID;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;

export async function fetchImagesFromDrive() {
  if (!FOLDER_ID || !API_KEY) {
    console.error("🚨 Missing API key or folder ID");
    return;
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?q="${FOLDER_ID}"+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`,
    );
    const data = await res.json();

    if (data.error) {
      console.error("🚨 Google Drive API Error:", data.error);
      return;
    }

    console.log("🔍 API Response:", data); // Debugging

    return data.files
      .filter((file: any) => file.mimeType.startsWith("image/")) // Get only images
      .map((file: any) => `https://drive.google.com/uc?id=${file.id}`);
  } catch (error) {
    console.error("🚨 Error fetching images:", error);
    return [];
  }
}
