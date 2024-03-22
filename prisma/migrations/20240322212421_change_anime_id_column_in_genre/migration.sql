/*
  Warnings:

  - Made the column `anime_id` on table `Genre` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_anime_id_fkey";

-- AlterTable
ALTER TABLE "Genre" ALTER COLUMN "anime_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_anime_id_fkey" FOREIGN KEY ("anime_id") REFERENCES "animes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
