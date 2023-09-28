"use client";
import { useModal } from "@/hooks/useModal";
import React from "react";

const UserChangeInfo = ({ id }: { id: string }) => {
  const { onOpen } = useModal();
  return (
    <button
      className="flex self-start mt-4 mr-2 font-bold relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-3xl outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-[#ededed]  border-zinc-500 shadow-sm text-md py-1 px-4"
      onClick={() => onOpen("change-info", id, null)}
    >
      Edit profile
    </button>
  );
};

export default UserChangeInfo;
