/*
  Warnings:

  - You are about to drop the column `episodeId` on the `watcheds` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `watcheds` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[author_id,episode_id]` on the table `watcheds` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_id` to the `watcheds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `episode_id` to the `watcheds` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "watcheds" DROP CONSTRAINT "watcheds_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "watcheds" DROP CONSTRAINT "watcheds_user_id_fkey";

-- DropIndex
DROP INDEX "watcheds_user_id_episodeId_key";

-- AlterTable
ALTER TABLE "watcheds" DROP COLUMN "episodeId",
DROP COLUMN "user_id",
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "episode_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "watcheds_author_id_episode_id_key" ON "watcheds"("author_id", "episode_id");

-- AddForeignKey
ALTER TABLE "watcheds" ADD CONSTRAINT "watcheds_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watcheds" ADD CONSTRAINT "watcheds_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
