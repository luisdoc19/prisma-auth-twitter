import FollowsButtons from "@/components/User/FollowsButtons";
import UnfollowButton from "@/components/User/UnfollowButton";
import UserFollowButton from "@/components/User/UserFollowButton";
import { UserHover } from "@/components/User/UserHover";
import { authOptions } from "@/libs/authOptions";
import { Follow, Posts, PublicUsers } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "@/libs/prisma";

type UserWithPosts = PublicUsers & {
  following: FollowersWithUser[];
};

type FollowersWithUser = Follow & {
  follower: PublicUsers;
};
const page = async ({ params }: { params: { id: string } }) => {
  const session: SessionWithExp | null = await getServerSession(authOptions);

  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  const user = await prisma?.publicUsers.findUnique({
    where: { user_name: params.id },
    include: {
      following: {
        include: {
          follower: {
            include: {
              following: true,
            },
          },
        },
      },
      follower: {
        include: {
          following: true,
        },
      },
    },
  });

  const userFollow = {
    ...user,
    following: user?.following.map((follow) => ({
      ...follow,
      isUserFollowing: follow.follower.following
        .map((follow) => follow.follower_id)
        .includes(session?.user.id),
    })),
  };

  return (
    userFollow.following !== undefined &&
    userFollow?.following.map((follow) => (
      <div
        key={user?.id}
        className="w-full p-3 hover:bg-zinc-950 cursor-pointer"
      >
        <div className="flex flex-row gap-2">
          <UserHover user={follow.follower} id={follow.following_id} />
          <div className="w-full flex flex-col gap-1">
            <div className="w-full flex flex-row justify-between">
              <div className="flex flex-col">
                <h3 className="font-bold text-base text-white">
                  {follow.follower.name}
                </h3>
                <span className="text-zinc-500 text-sm">
                  @{follow.follower.user_name}
                </span>
              </div>
              <div className="flex self-center">
                <FollowsButtons
                  isFollowing={follow.isUserFollowing}
                  id={session.user.id}
                  otherUser={follow.follower}
                />
              </div>
            </div>
            <div>
              <p className="text-base text-white">{follow.follower.bio}</p>
            </div>
          </div>
        </div>
      </div>
    ))
  );
};

export default page;
