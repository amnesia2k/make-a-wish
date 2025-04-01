import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchImagesFromDrive } from "~@/app/utils/helpers";

interface CardSelectionProps {
  wishType?: { name: string; image: { src: string } };
  onBack: () => void;
  onNext: (selectedCard: string) => void;
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
  onNext,
}: CardSelectionProps) {
  // Initialize state at the top (before any conditional returns)
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

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
    <div className="mx-2 flex flex-col items-center">
      <h3 className="text-xl font-bold">Select a {wishType?.name} Card</h3>

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
              className={`cursor-pointer rounded-lg shadow-md transition-all duration-300 ${selectedCard === src ? "border-electric-purple border p-1 hover:-translate-y-0" : "hover:-translate-y-3"}`}
              onClick={() => setSelectedCard(src)}
            />
          ))}
        </div>
      )}

      {/* Button Container - Sticks to Bottom */}
      <div className="bg-snow-white/40 fixed bottom-6 flex w-full max-w-md justify-between rounded-full px-4 py-2 backdrop-blur-2xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="text-soft-charcoal flex cursor-pointer items-center gap-2 rounded-full border px-6 py-3 font-bold"
        >
          <ChevronLeft />
          Back
        </button>

        {/* Next Button */}
        <button
          onClick={() => selectedCard && onNext(selectedCard)}
          disabled={!selectedCard}
          className={`flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition-all duration-200 ${
            selectedCard
              ? "bg-neon-pink hover:bg-neon-pink/70 cursor-pointer"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          Next
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
