"use client";

import React from "react";
import Confetti from "./confetti";
import type { WishViewProps } from "~@/app/utils/props";
import WishCard from "./wish-card";

export default function WishView({ wish }: WishViewProps) {
  return (
    <div>
      <Confetti />
      <div className="fixed inset-x-0 bottom-0">
        <div className="bg-soft-charcoal fixed inset-x-0 top-0 mx-auto w-[300px] rounded-b-2xl py-2 text-center text-white">
          <h3>You GOT a card from {wish?.senderName}!</h3>
        </div>

        <WishCard wish={wish} />
      </div>
    </div>
  );
}
