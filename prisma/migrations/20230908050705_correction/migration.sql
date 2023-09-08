/*
  Warnings:

  - The `replied_id` column on the `Posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `post_reply_id` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "replied_id",
ADD COLUMN     "replied_id" TEXT[];

-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "post_reply_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_post_reply_id_fkey" FOREIGN KEY ("post_reply_id") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
