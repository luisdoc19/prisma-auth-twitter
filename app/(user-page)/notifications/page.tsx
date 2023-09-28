import Notification from "@/components/Notification/Notification";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session: SessionWithExp | null = await getServerSession(authOptions);
  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  const notifications = await prisma?.notifications.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      follow: {
        include: {
          following: true,
          follower: true,
        },
      },
      like: {
        include: {
          user: true,
          post: {
            include: {
              user: true,
            },
          },
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(notifications);

  return (
    <div>
      <Notification notifications={notifications} id={session.user.id} />
    </div>
  );
};

export default page;
