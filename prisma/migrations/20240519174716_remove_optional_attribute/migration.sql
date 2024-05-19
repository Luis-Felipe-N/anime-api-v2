/*
  Warnings:

  - Made the column `episodeId` on table `watcheds` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "watcheds" DROP CONSTRAINT "watcheds_episodeId_fkey";

-- AlterTable
ALTER TABLE "watcheds" ALTER COLUMN "episodeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "watcheds" ADD CONSTRAINT "watcheds_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
