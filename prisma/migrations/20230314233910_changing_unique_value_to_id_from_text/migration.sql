/*
  Warnings:

  - A unique constraint covering the columns `[id,studentId]` on the table `Music` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,studentId]` on the table `Work` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Music_title_studentId_key";

-- DropIndex
DROP INDEX "Work_text_studentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Music_id_studentId_key" ON "Music"("id", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Work_id_studentId_key" ON "Work"("id", "studentId");
