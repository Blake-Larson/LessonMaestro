-- DropForeignKey
ALTER TABLE "Music" DROP CONSTRAINT "Music_studentId_fkey";

-- AlterTable
ALTER TABLE "Music" ALTER COLUMN "studentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Music" ADD CONSTRAINT "Music_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
