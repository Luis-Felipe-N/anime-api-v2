/*
  Warnings:

  - A unique constraint covering the columns `[user_id,episodeId]` on the table `watcheds` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "watcheds" ADD COLUMN     "episodeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "watcheds_user_id_episodeId_key" ON "watcheds"("user_id", "episodeId");

-- AddForeignKey
ALTER TABLE "watcheds" ADD CONSTRAINT "watcheds_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "episodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
