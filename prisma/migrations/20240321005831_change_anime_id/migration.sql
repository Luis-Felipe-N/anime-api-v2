/*
  Warnings:

  - Made the column `anime_id` on table `seasons` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "seasons" DROP CONSTRAINT "seasons_anime_id_fkey";

-- AlterTable
ALTER TABLE "seasons" ALTER COLUMN "anime_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
