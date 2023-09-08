-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "fileUrl" VARCHAR(255),
ADD COLUMN     "replied" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Retweet" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Retweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Retweet" ADD CONSTRAINT "Retweet_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retweet" ADD CONSTRAINT "Retweet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
