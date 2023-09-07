"use client";
import axios from "axios";
import { Mail, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const UserFollowButton = ({
  id,
  otherUserId,
}: {
  id: string;
  otherUserId: string | undefined;
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-row items-center mt-4 gap-1">
      <div className="border-zinc-600 border-2 rounded-full p-2 select-none">
        <MoreHorizontal width={17} height={17} className="select-none" />
      </div>
      <div
        className="border-zinc-600 border-2 rounded-full p-2 select-none cursor-pointer"
        onClick={async () => {
          const { data } = await axios.get(
            `/api/messages?id=${id}&otherUserId=${otherUserId}`
          );
          router.push(`/messages/${data?.link}`);
        }}
      >
        <Mail width={17} height={17} />
      </div>
      <button className="flex self-center select-none mr-2 font-bold relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-3xl outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-black bg-white  border-zinc-500 shadow-sm text-md py-1 px-4 hover:opacity-90">
        Follow
      </button>
    </div>
  );
};

export default UserFollowButton;
