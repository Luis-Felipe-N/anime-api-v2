-- DropForeignKey
ALTER TABLE "animes" DROP CONSTRAINT "animes_watchlistId_fkey";

-- AlterTable
ALTER TABLE "animes" ALTER COLUMN "watchlistId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "animes" ADD CONSTRAINT "animes_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "watchlists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
