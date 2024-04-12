/*
  Warnings:

  - You are about to drop the `WatchlistsOnAnimes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WatchlistsOnAnimes" DROP CONSTRAINT "WatchlistsOnAnimes_animeId_fkey";

-- DropForeignKey
ALTER TABLE "WatchlistsOnAnimes" DROP CONSTRAINT "WatchlistsOnAnimes_watchlistId_fkey";

-- AlterTable
ALTER TABLE "animes" ADD COLUMN     "watchlistId" TEXT;

-- DropTable
DROP TABLE "WatchlistsOnAnimes";

-- AddForeignKey
ALTER TABLE "animes" ADD CONSTRAINT "animes_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "watchlists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
