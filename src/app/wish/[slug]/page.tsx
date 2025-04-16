import React from "react";
import prisma from "~@/server/db";
import WishView from "../_component/wish-view";
import type { WishPageProps } from "~@/app/utils/props";

export default async function WishPage({ params }: WishPageProps) {
  const { slug } = await params;

  const wish = await prisma.wish.findUnique({
    where: { slug },
  });

  if (!wish) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-bold text-red-500">Wish not found 🥲</p>
      </div>
    );
  }

  return <WishView wish={wish} />;
}
