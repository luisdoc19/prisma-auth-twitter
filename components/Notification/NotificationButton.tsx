"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSocket } from "../providers/socketProvider";

const NotificationButton = ({ id }: { id: string }) => {
  const { socket } = useSocket();
  useEffect(() => {
    if (!socket) return;

    socket.on(`notification:${id}`, (message: any) => {
      console.log(message);
    });

    return () => {
      socket.off(`notification:${id}`);
    };
  }, [id, socket]);
  return (
    <Link
      href="/notifications"
      className="flex flex-row gap-4 hover:bg-zinc-800 w-max px-4 py-3 rounded-3xl mx-auto relative"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-bell"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
        <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
      </svg>
      <div className="absolute top-2 left-6 w-[24px] text-xs bg-sky-600 rounded-lg flex mx-auto justify-center">
        1
      </div>
      <span className="text-white text-xl max-xl:hidden">Notifications</span>
    </Link>
  );
};

export default NotificationButton;
