"use client";
import {
  ElementRef,
  useEffect,
  experimental_useOptimistic as useOptimistic,
  useRef,
  useState,
} from "react";
import React from "react";
import Image from "next/image";

import { Gift, ImageIcon, Smile } from "lucide-react";

import { useChatScroll } from "@/hooks/useScroll";
import InputChat from "./InputChat";

import noUser from "@/public/no-user-image-icon-23.jpg";

const MessageTexts = ({
  directMessage,
  message,
  id,
}: {
  message: any;
  directMessage: directMessageSender[] | undefined;
  id: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    directMessageSender[] | undefined,
    directMessageSender | undefined
  >(directMessage, (currentMessage, newMessage) => {
    if (!currentMessage || !newMessage) return currentMessage;
    const newOptimisticMessage = [...currentMessage];
    newOptimisticMessage.push(newMessage);
    return newOptimisticMessage;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useChatScroll({
    chatRef,
    bottomRef,
    count: optimisticTweets?.length || 0,
    mounted,
  });

  if (!mounted) return null;

  return (
    <>
      <section className="p-3 overflow-y-scroll" ref={chatRef}>
        <div className="grid place-items-center pb-10 border-b border-zinc-600 hover:bg-zinc-900 pt-3">
          <div className="text-center">
            <Image
              width={900}
              height={900}
              src={(message.user !== false && message.user.image) || noUser}
              alt=""
              className="w-[50px] rounded-full mx-auto"
            />
            <div className="flex flex-col">
              <h3 className="text-white font-bold">
                {message.user !== false && message.user.name}
              </h3>
              <span className="text-sm text-zinc-500">
                @
                {(message.user !== false && message.user.user_name) ||
                  "luisdoc19"}
              </span>
              <span className="mt-5 text-sm text-zinc-500">
                Joined{" "}
                {message.user !== false &&
                  message.user.createdAt.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}{" "}
                · 1,337 followers
              </span>
              <span className="mt-3 text-sm text-zinc-500">
                Not followed by anyone you are following
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          {optimisticTweets?.map((message) => (
            <div
              key={message.id}
              className={`flex pb-[24px] ${
                message.senderId === id ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex flex-col">
                <span
                  className={`p-3 ${
                    message.senderId === id
                      ? "bg-[#4a99e9] rounded-t-3xl rounded-l-3xl"
                      : "bg-[#303336] rounded-t-3xl rounded-r-3xl"
                  }`}
                >
                  {message.content}
                </span>
                <span
                  className={`text-xs text-zinc-500 ${
                    message.senderId === id ? "text-end" : "text-start"
                  }`}
                >
                  {message.createdAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div ref={bottomRef} />
      </section>
      <section className="sticky bg-[#212327] p-3 flex flex-row rounded-2xl overflow-hidden">
        <div className="flex flex-row gap-3 items-center">
          <ImageIcon width={17} color="#4a99e9" />
          <Gift width={17} color="#4a99e9" />
          <Smile width={17} color="#4a99e9" />
        </div>
        <InputChat
          messageId={message.id}
          userId={id}
          addOptimisticTweet={addOptimisticTweet}
          //@ts-ignore
          suppressHydrationWarning
        />
      </section>
    </>
  );
};

export default MessageTexts;
