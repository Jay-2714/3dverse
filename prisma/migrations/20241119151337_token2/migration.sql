/*
  Warnings:

  - Made the column `token` on table `Token` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Token_userId_key";

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "token" SET NOT NULL;
