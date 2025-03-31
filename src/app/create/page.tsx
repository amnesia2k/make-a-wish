"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchImagesFromDrive } from "../utils/helpers";

export default function CreateWish() {
  // const slugId = createId().slice(0, 10);

  // console.log(slugId);

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function loadImages() {
      const imagesUrl = await fetchImagesFromDrive();

      setImages(imagesUrl);
    }

    loadImages();
  }, []);

  return (
    <div>
      {images.map((url, index) => (
        <div key={index}>
          <Image src={url} alt={`Image ${index}`} width={200} height={400} />
        </div>
      ))}
    </div>
  );
}
