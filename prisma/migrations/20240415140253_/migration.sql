/*
  Warnings:

  - You are about to drop the column `watchlistId` on the `animes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "animes" DROP CONSTRAINT "animes_watchlistId_fkey";

-- AlterTable
ALTER TABLE "animes" DROP COLUMN "watchlistId";

-- CreateTable
CREATE TABLE "WatchlistOnAnimes" (
    "animeId" TEXT NOT NULL,
    "watchlistId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "WatchlistOnAnimes_pkey" PRIMARY KEY ("animeId","watchlistId")
);

-- AddForeignKey
ALTER TABLE "WatchlistOnAnimes" ADD CONSTRAINT "WatchlistOnAnimes_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchlistOnAnimes" ADD CONSTRAINT "WatchlistOnAnimes_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "watchlists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
