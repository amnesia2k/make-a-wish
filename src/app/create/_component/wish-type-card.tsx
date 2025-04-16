import React from "react";
import { wishType } from "..";
import Image from "next/image";
import type { WishTypeCardProps } from "~@/app/utils/props";

export default function WishTypeCard({ onSelect }: WishTypeCardProps) {
  return (
    <div className="my-10 flex flex-wrap items-center justify-center gap-5">
      {wishType.map((type) => (
        <div
          key={type?.id}
          style={{ backgroundColor: type?.color }}
          className="border-soft-charcoal relative flex h-[160px] w-[450px] cursor-pointer items-end justify-between rounded-lg border p-3"
          onClick={() => onSelect(type.name)}
        >
          <h3 className="font-indie-flower text-lg font-medium whitespace-nowrap">
            {type?.name}
          </h3>

          <Image
            src={type?.image.src}
            alt={type?.name}
            fill
            className="absolute top-0 right-0 h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
