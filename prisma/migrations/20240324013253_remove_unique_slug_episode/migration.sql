/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `genres` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "episodes_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "genres_slug_key" ON "genres"("slug");
