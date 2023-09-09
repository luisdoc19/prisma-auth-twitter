import { authOptions } from "@/libs/authOptions";
import { Heart, Settings, User2 } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import noUser from "@/public/no-user-image-icon-23.jpg";
import Link from "next/link";

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
  });

  console.log(notifications);

  return (
    <div>
      {notifications?.map((notification) => (
        <Link
          href={`/${notification.like?.post.user.user_name}/status/${notification.like?.post.id}`}
          key={notification.id}
          className="flex flex-row gap-3 px-6 py-3 w-full cursor-pointer border-b border-zinc-600"
        >
          {notification.type === "follow" && (
            <User2 fill="#3982c2" color="#3982c2" width={26} height={26} />
          )}
          {notification.type === "like" && (
            <>
              <Heart fill="#e5387f" width={26} height={26} color="#e5387f" />
              <div className="flex flex-col gap-2">
                <Image
                  src={notification.like?.user.image || noUser}
                  alt=""
                  width={900}
                  height={900}
                  className="w-[30px] h-[30px] rounded-full"
                />
                <span className="text-white text-base">
                  <strong>
                    {notification.like?.user.name} {}
                  </strong>
                  like your post
                </span>
                <span className="text-zinc-500 text-base">
                  {notification.like?.post.text}
                </span>
              </div>
            </>
          )}
          <div></div>
        </Link>
      ))}
    </div>
  );
};

export default page;
