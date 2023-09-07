"use client";
import Link from "next/link";
import React from "react";
import noUser from "@/public/no-user-image-icon-23.jpg";
import Image from "next/image";

const UserProfileChat = ({
  messages,
}: {
  messages: MessageWithUsers[] | undefined;
}) => {
  return messages?.map((message) => (
    <Link href={`/messages/${message.id}`} key={message.id}>
      <div className="flex flex-row gap-3 py-3 px-4 hover:bg-zinc-900 cursor-pointer">
        <Image
          width={900}
          height={900}
          src={(message.user !== false && message?.user?.image) || noUser}
          alt={message.user !== false ? message?.user?.name : ""}
          className="w-[45px] rounded-full"
        />
        <div>
          <div className="flex flex-row gap-2 items-center">
            <h3 className="text-md font-bold">
              {message.user !== false && message.user.name}
            </h3>
            <span className="text-zinc-500 text-sm">
              @
              {(message.user !== false && message?.user.user_name) ||
                "luisdoc19"}
            </span>
          </div>
          <div>
            <p className="text-sm">{message?.directMessage[0]?.content}</p>
          </div>
        </div>
      </div>
    </Link>
  ));
};

export default UserProfileChat;
