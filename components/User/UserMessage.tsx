"use client";
import React from "react";
import noUser from "@/public/no-user-image-icon-23.jpg";

import { ChevronsUp, MailPlus } from "lucide-react";
import Image from "next/image";

const UserMessage = ({ message }: { message: any }) => {
  return (
    <div className="fixed bottom-0 right-0 mr-5 w-[400px] shadow-[0_5px_20px_0_rgba(255,255,255,0.7)] rounded-t-2xl z-50 bg-black">
      <header className="flex justify-between flex-row py-2 px-4">
        <h2 className="text-xl font-bold">Messages</h2>
        <div className="flex flex-row gap-2">
          <MailPlus />
          <ChevronsUp />
        </div>
      </header>
      <main className="h-[320px] mt-2">
        {message?.map((msg: any) => (
          <div
            className="flex flex-row gap-2 py-2 px-4 hover:bg-zinc-900 cursor-pointer"
            key={msg.id}
          >
            <Image
              width={900}
              height={900}
              src={msg?.user?.image || noUser}
              alt={msg?.user?.name}
              className="w-[42px] rounded-full"
            />
            <div>
              <div className="flex flex-row gap-2 items-center">
                <h3 className="text-md font-bold">{msg?.user?.name}</h3>
                <span className="text-zinc-500 text-sm">
                  @{msg?.user?.user_name || "luisdoc19"}
                </span>
              </div>
              <div>
                <p className="text-sm">
                  {msg.directMessage[msg.directMessage.length - 1]?.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default UserMessage;
