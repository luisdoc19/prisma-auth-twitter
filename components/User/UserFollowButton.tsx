"use client";
import axios from "axios";
import { Mail, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import UnfollowButton from "./UnfollowButton";
import FollowsButtons from "./FollowsButtons";

const UserFollowButton = ({
  id,
  otherUserId,
  isFollowing,
}: {
  id: string;
  otherUserId: PublicUser;
  isFollowing: boolean;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center mt-4 gap-1">
      <div className="border-zinc-600 border rounded-full p-2 select-none">
        <MoreHorizontal width={17} height={17} className="select-none" />
      </div>
      <div
        className="border-zinc-600 border rounded-full p-2 select-none cursor-pointer"
        onClick={async () => {
          const { data } = await axios.get(
            `/api/messages?id=${id}&otherUserId=${otherUserId?.id}`
          );
          router.push(`/messages/${data?.link}`);
        }}
      >
        <Mail width={17} height={17} />
      </div>
      <FollowsButtons
        isFollowing={isFollowing}
        id={id}
        otherUser={otherUserId}
      />
    </div>
  );
};

export default UserFollowButton;
