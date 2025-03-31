import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchImagesFromDrive } from "~@/app/utils/helpers";

interface CardSelectionProps {
  wishType?: { name: string; image: { src: string } };
  onBack: () => void;
}

const WISH_TYPE_MAP: Record<string, string> = {
  "Happy Birthday": "Birthday",
  Congratulations: "Congratulations",
  "Love & Anniversaries": "Anniversary",
  "Mother's Day": "Mother's Day",
  "Father's Day": "Father's Day",
  "Just Because...": "Just Because",
  "Christmas & New Year's": "Christmas",
  "Sorry/Apologies": "Sorry",
  "Thank You": "Thank You",
  "Valentine's": "Valentine's",
};

const FOLDER_IDS: Record<string, string | undefined> = {
  Birthday: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_BIRTHDAY_FOLDER_ID,
  Congratulations:
    process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CONGRATULATIONS_FOLDER_ID,
};

export default function CardSelection({
  wishType = { name: "", image: { src: "" } },
  onBack,
}: CardSelectionProps) {
  // Initialize state at the top (before any conditional returns)
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Early return if no wishType
    if (!wishType) {
      setLoading(false);
      return;
    }

    async function loadImages() {
      try {
        setLoading(true);

        const mappedWishType = WISH_TYPE_MAP[wishType.name] ?? wishType.name;
        const folderId = mappedWishType
          ? FOLDER_IDS[mappedWishType]
          : undefined;

        if (!folderId) {
          console.error(
            `🚨 No folder ID found for: ${wishType.name} (${mappedWishType})`,
          );
          setLoading(false);
          return;
        }

        console.log(
          `🔄 Fetching images for ${mappedWishType} (Folder ID: ${folderId})`,
        );

        const imageUrls = await fetchImagesFromDrive(folderId);
        setImages(imageUrls);
      } catch (error) {
        console.error("Failed to load images:", error);
      } finally {
        setLoading(false);
      }
    }

    void loadImages(); // Explicitly mark promise as intentionally not awaited
  }, [wishType]);

  // Render nothing if no wishType
  if (!wishType) return null;

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onBack}
        className="my-4 flex cursor-pointer items-center self-start rounded-md px-4 py-2 underline"
      >
        <ChevronLeft /> Back
      </button>

      <h3 className="text-xl font-bold">Select a {wishType.name} Card</h3>

      {loading ? (
        <p>Loading cards...</p>
      ) : images.length === 0 ? (
        <p>No cards available.</p>
      ) : (
        <div className="my-5 flex w-full flex-wrap justify-center gap-5">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Card ${index + 1}`}
              width={150}
              height={200}
              className="rounded-lg shadow-md"
            />
          ))}
        </div>
      )}
    </div>
  );
}
