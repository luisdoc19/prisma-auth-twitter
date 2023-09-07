"use client";
import axios from "axios";
import { SendHorizontal } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSocket } from "../providers/socketProvider";
import { DirectMessage, PublicUsers } from "@prisma/client";
import { useRouter } from "next/navigation";

type directMessageSender = DirectMessage & {
  sender: PublicUsers;
};

const InputChat = ({
  messageId,
  userId,
  addOptimisticTweet,
}: {
  messageId: string | undefined;
  userId: string;
  addOptimisticTweet: (newMessage: directMessageSender | undefined) => void;
}) => {
  const router = useRouter();
  const { socket } = useSocket();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (!messageId) return;
    await axios.post(`/api/socket/message?messageId=${messageId}`, {
      userId,
      message: data.message,
    });
    reset();
  });

  const channelKey = `chat:${messageId}:messages`;

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(channelKey, (message: directMessageSender) => {
      addOptimisticTweet({
        ...message,
        createdAt: new Date(message.createdAt),
      });

      router.refresh();
    });

    return () => {
      socket.off(channelKey);
    };
  }, [socket, channelKey, addOptimisticTweet, router]);

  return (
    <form className="flex flex-row w-full items-center" onSubmit={onSubmit}>
      <div className="w-full px-3">
        <input
          type="text"
          placeholder="Start a new message"
          className="bg-transparent w-full outline-none"
          autoFocus
          {...register("message")}
        />
      </div>
      <div className="flex items-center">
        <button type="submit">
          <SendHorizontal
            width={18}
            color="#4a99e9"
            className={`cursor-pointer`}
          />
        </button>
      </div>
    </form>
  );
};

export default InputChat;
