/*
  Warnings:

  - Added the required column `commentedPostId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Comment" ADD COLUMN     "commentedPostId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_commentedPostId_fkey" FOREIGN KEY ("commentedPostId") REFERENCES "public"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
