"use server";

import { createId } from "@paralleldrive/cuid2";
import prisma from "~@/server/db";

export async function createWish(formData: FormData) {
  try {
    const slug = createId().slice(0, 10);

    const newWish = await prisma.wish.create({
      data: {
        slug,
        senderName: formData.get("senderName") as string,
        recipientName: formData.get("recipientName") as string,
        message: formData.get("message") as string,
        imageUrl: formData.get("imageUrl") as string,
        spotifyLink: (formData.get("spotifyLink") as string) || "",
      },
    });

    return { success: true, slug: newWish?.slug };
  } catch (err) {
    console.error("❌ Error creating wish:", err);

    return { success: false, err: "❌ Failed to create wish" };
  }
}
