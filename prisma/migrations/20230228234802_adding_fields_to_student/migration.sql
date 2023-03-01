/*
  Warnings:

  - Added the required column `status` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "image" STRING;
ALTER TABLE "Student" ADD COLUMN     "status" BOOL NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "studioName" STRING;
