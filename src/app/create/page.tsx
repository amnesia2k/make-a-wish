"use client";

import { useState } from "react";
import WishTypeCard from "./_component/wish-type-card";
import CardSelection from "./_component/card-selection";
import { wishType } from ".";

export default function CreateWish() {
  const [selectedWishType, setSelectedWishType] = useState<string | null>(null);

  // console.log(selectedWishType);

  return (
    <div className="py-5">
      <h3 className="font-baloo text-soft-charcoal mb-5 text-center text-2xl font-medium">
        make-a-wish
      </h3>

      {/* Progress Bar - This is going to be a progress bar to track the step user is currently on, so the width of the self closing div would change dynamically */}
      <div className="bg-cool-gray h-2 w-full rounded-full">
        <div className="from-neon-pink to-electric-purple h-2 w-[30%] rounded-full bg-gradient-to-tr" />
      </div>

      {selectedWishType === null ? (
        <WishTypeCard onSelect={(type) => setSelectedWishType(type)} />
      ) : (
        <CardSelection
          wishType={wishType.find((w) => w.name === selectedWishType)}
          onBack={() => setSelectedWishType(null)}
        />
      )}
    </div>
  );
}
