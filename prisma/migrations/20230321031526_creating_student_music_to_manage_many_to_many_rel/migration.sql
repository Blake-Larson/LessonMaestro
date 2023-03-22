/*
  Warnings:

  - You are about to drop the column `studentId` on the `Music` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Music" DROP CONSTRAINT "Music_studentId_fkey";

-- AlterTable
ALTER TABLE "Music" DROP COLUMN "studentId";

-- CreateTable
CREATE TABLE "StudentMusic" (
    "studentId" STRING NOT NULL,
    "musicId" STRING NOT NULL,

    CONSTRAINT "StudentMusic_pkey" PRIMARY KEY ("studentId","musicId")
);

-- AddForeignKey
ALTER TABLE "StudentMusic" ADD CONSTRAINT "StudentMusic_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMusic" ADD CONSTRAINT "StudentMusic_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
