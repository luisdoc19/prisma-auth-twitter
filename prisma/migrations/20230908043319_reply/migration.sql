/*
  Warnings:

  - You are about to drop the column `replied` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Retweet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Retweet" DROP CONSTRAINT "Retweet_user_id_fkey";

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "replied",
ADD COLUMN     "replied_id" TEXT;

-- AlterTable
ALTER TABLE "Retweet" DROP COLUMN "user_id";
