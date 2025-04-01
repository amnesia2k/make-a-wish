-- CreateTable
CREATE TABLE "Wish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "spotifyLink" TEXT NOT NULL,
    "fontStyle" TEXT NOT NULL,
    "fontSize" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Wish_slug_key" ON "Wish"("slug");
