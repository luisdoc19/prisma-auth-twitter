/*
  Warnings:

  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Retweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_post_reply_id_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Retweet" DROP CONSTRAINT "Retweet_post_id_fkey";

-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "replied_id" DROP NOT NULL,
ALTER COLUMN "replied_id" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Reply";

-- DropTable
DROP TABLE "Retweet";

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_replied_id_fkey" FOREIGN KEY ("replied_id") REFERENCES "Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
