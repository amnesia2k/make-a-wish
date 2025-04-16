"use client";

import { useAnimation, motion } from "motion/react";
import type { PanInfo } from "motion/react";
import Image from "next/image";
import React, { useRef } from "react";
import type { WishViewProps } from "~@/app/utils/props";

export default function WishCard({ wish }: WishViewProps) {
  const controls = useAnimation();
  const cardRef = useRef(null);

  const dragEnd = async (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (Math.abs(info.offset.x) > 100) {
      await controls.start({ x: info.offset.x > 0 ? 500 : -500, opacity: 0 });

      console.log("Swiped!", wish.slug);
    } else {
      await controls.start({ x: 0 });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={dragEnd}
      animate={controls}
      className="relative z-[999] mx-auto mt-24 w-[90%] max-w-md cursor-grab active:cursor-grabbing"
      initial={{ scale: 0.95, opacity: 0 }}
      // animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
        {wish.imageUrl && (
          <Image
            src={wish?.imageUrl}
            alt="Card image"
            width={400}
            height={200}
            className="rounded-lg object-cover"
          />
        )}
        <h2 className="text-lg font-semibold text-gray-800">
          Hey {wish.recipientName}, you&apos;ve got a message!
        </h2>
        <p className="text-gray-600 italic">&quot;{wish.message}&quot;</p>
        <p className="text-right text-sm text-gray-500">— {wish.senderName}</p>

        {wish.spotifyLink && (
          <div className="mt-2">
            <iframe
              src={`https://open.spotify.com/embed/track/${extractSpotifyId(
                wish.spotifyLink,
              )}`}
              width="100%"
              height="80"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-md"
            ></iframe>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function extractSpotifyId(url: string | null | undefined) {
  if (!url) return "";
  const parts = url.split("/");
  return parts[parts.length - 1]?.split("?")[0];
}
