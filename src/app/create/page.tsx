"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchImagesFromDrive } from "../utils/helpers";

export default function CreateWish() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    void (async () => {
      try {
        const imagesUrl: string[] = await fetchImagesFromDrive(); // Explicitly typed
        setImages(imagesUrl);
      } catch (error) {
        console.error("🚨 Error loading images:", error);
      }
    })();

    // loadImages();
  }, []);

  return (
    <div>
      {images.length === 0 ? (
        <p>Loading images...</p>
      ) : (
        images.map((url, index) => (
          <div key={index}>
            <Image src={url} alt={`Image ${index}`} width={200} height={400} />
          </div>
        ))
      )}
    </div>
  );
}

// const slugId = createId().slice(0, 10);

// console.log(slugId);
