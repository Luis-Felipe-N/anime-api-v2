/*
  Warnings:

  - Made the column `season_id` on table `episodes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "episodes" DROP CONSTRAINT "episodes_season_id_fkey";

-- AlterTable
ALTER TABLE "episodes" ALTER COLUMN "season_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
