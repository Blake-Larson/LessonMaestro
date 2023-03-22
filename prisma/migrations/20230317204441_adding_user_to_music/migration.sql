/*
  Warnings:

  - Added the required column `userId` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Music_id_studentId_key";

-- AlterTable
ALTER TABLE "Music" ADD COLUMN     "userId" STRING NOT NULL;
ALTER TABLE "Music" ADD COLUMN     "year" STRING;

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
