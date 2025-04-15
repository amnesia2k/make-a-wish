"use client";

import React from "react";
import Confetti from "./confetti";

interface WishViewProps {
  wish: {
    senderName: string;
    recipientName: string;
    message: string;
    slug: string;
    spotifyLink?: string | null;
    imageUrl?: string | null;
  };
}

export default function WishView({ wish }: WishViewProps) {
  return (
    <div>
      <Confetti />
      <div>
        <div className="bg-soft-charcoal fixed inset-x-0 top-0 mx-auto w-[300px] rounded-b-2xl py-2 text-center text-white">
          <h3>You GOT a card from {wish?.senderName}!</h3>
        </div>
      </div>
    </div>
  );
}
