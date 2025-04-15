import React from "react";
import prisma from "~@/server/db";

interface WishPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WishPage({ params }: WishPageProps) {
  const { slug } = await params;

  const wish = await prisma.wish.findUnique({
    where: { slug },
  });

  return (
    <div>
      <h3>
        {wish?.senderName} - {wish?.slug}
      </h3>
    </div>
  );
}
