/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `watchlists` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "watchlists_user_id_key" ON "watchlists"("user_id");
