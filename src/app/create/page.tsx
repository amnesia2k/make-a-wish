import React from "react";
import { birthdayCards } from "..";
import Image from "next/image";

export default function CreateWish() {
  // const slugId = createId().slice(0, 10);

  // console.log(slugId);

  const images = birthdayCards;

  // console.log(images);

  // Custom image loader for UploadThing URLs
  // const uploadThingLoader = ({ src }: { src: string }) => {
  //   return src; // Ensures Next.js loads it without modifying the URL
  // };

  return (
    <div>
      {images.map((img) => (
        <div key={img?.id}>
          <Image
            src={`/api/image-proxy?url=${encodeURIComponent(img.image)}`}
            alt={String(img?.id)}
            width={150}
            height={300}
          />
        </div>
      ))}
    </div>
  );
}
