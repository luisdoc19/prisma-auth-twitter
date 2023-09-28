"use client";
import React from "react";
import UnfollowButton from "./UnfollowButton";
import axios from "axios";
import { useRouter } from "next/navigation";

const FollowsButtons = ({
  isFollowing,
  id,
  otherUser,
}: {
  isFollowing: boolean;
  id: string;
  otherUser: PublicUser;
}) => {
  const router = useRouter();

  if (id === otherUser?.id) return;

  return isFollowing ? (
    <UnfollowButton id={id} userId={otherUser} />
  ) : (
    <button
      className="flex self-center select-none mr-2 font-bold relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 rounded-3xl outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-black bg-white  border-zinc-500 shadow-sm text-md py-1 px-4 hover:opacity-90"
      onClick={async () => {
        const { data } = await axios.post(
          `/api/socket/follow/${id}/to/${otherUser?.id}`
        );
        console.log(data);
        router.refresh();
      }}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowsButtons;
