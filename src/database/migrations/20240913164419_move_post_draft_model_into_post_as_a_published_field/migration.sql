/*
  Warnings:

  - You are about to drop the `PostDraft` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostDraft" DROP CONSTRAINT "PostDraft_authorId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "PostDraft";
