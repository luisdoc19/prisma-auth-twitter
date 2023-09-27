"use client";
import { useRouter } from "next/navigation";
import { Heart, User2 } from "lucide-react";
import noUser from "@/public/no-user-image-icon-23.jpg";
import Image from "next/image";
import React, { experimental_useOptimistic, useEffect, useState } from "react";
import Link from "next/link";
import { useSocket } from "../providers/socketProvider";

const Notification = ({ notifications, id }: any) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { socket } = useSocket();
  const [optimisticNotification, addOptimisticNotification] =
    experimental_useOptimistic(
      notifications,
      (currentNotification, newNotification) => {
        const notifications = [...currentNotification];
        notifications.unshift(newNotification);
        return notifications;
      }
    );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on(`notification:${id}`, (message: any) => {
      addOptimisticNotification(message);
      router.refresh();
    });

    return () => {
      socket.off(`notification:${id}`);
    };
  }, [socket, id, addOptimisticNotification, router]);

  if (!mounted) return null;

  return (
    <>
      {optimisticNotification?.map((notification: any) => (
        <>
          {notification.type === "follow" && (
            <Link
              href={`/${notification.follow?.follower_id}`}
              key={notification.id}
              className="flex flex-row gap-3 px-6 py-3 w-full cursor-pointer border-b border-zinc-600"
            >
              <User2 fill="#3982c2" color="#3982c2" width={26} height={26} />
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
                  followed you
                </span>
                <span className="text-zinc-500 text-base">
                  {notification.like?.user.bio}
                </span>
              </div>
            </Link>
          )}
          {notification.type === "like" && (
            <Link
              href={`/${notification.like?.post.user.user_name}/status/${notification.like?.post.id}`}
              key={notification.id}
              className="flex flex-row gap-3 px-6 py-3 w-full cursor-pointer border-b border-zinc-600"
            >
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
            </Link>
          )}
        </>
      ))}
    </>
  );
};

export default Notification;
