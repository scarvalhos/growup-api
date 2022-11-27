/*
  Warnings:

  - You are about to drop the column `educatorId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "educatorId",
DROP COLUMN "studentId";
