/*
  Warnings:

  - A unique constraint covering the columns `[anime_id,slug]` on the table `seasons` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "seasons_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "seasons_anime_id_slug_key" ON "seasons"("anime_id", "slug");
