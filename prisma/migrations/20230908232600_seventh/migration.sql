-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
