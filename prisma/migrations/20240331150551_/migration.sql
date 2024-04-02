/*
  Warnings:

  - A unique constraint covering the columns `[anime_id,slug]` on the table `genres` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "genres_anime_id_slug_key" ON "genres"("anime_id", "slug");
