import UnfollowButton from "@/components/User/UnfollowButton";
import { UserHover } from "@/components/User/UserHover";
import { authOptions } from "@/libs/authOptions";
import { Follow, Posts, PublicUsers } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type UserWithPosts = PublicUsers & {
  follower: FollowersWithUser[];
};

type FollowersWithUser = Follow & {
  following: PublicUsers;
};
const page = async ({ params }: { params: { id: string } }) => {
  const session: SessionWithExp | null = await getServerSession(authOptions);

  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  const user: UserWithPosts | null | undefined =
    await prisma?.publicUsers.findUnique({
      where: { user_name: params.id },
      include: {
        follower: {
          include: {
            following: true,
          },
        },
      },
    });

  return user?.follower.map((follow) => (
    <div key={user.id} className="w-full p-3 hover:bg-zinc-950 cursor-pointer">
      <div className="flex flex-row gap-2">
        <UserHover user={follow.following} id={follow.following_id} />
        <div className="w-full flex flex-col gap-1">
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-col">
              <h3 className="font-bold text-base text-white">
                {follow.following.name}
              </h3>
              <span className="text-zinc-500 text-sm">
                @{follow.following.user_name}
              </span>
            </div>
            <div className="flex self-center">
              <UnfollowButton id={session.user.id} userId={follow.following} />
            </div>
          </div>
          <div>
            <p className="text-base text-white">{follow.following.bio}</p>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default page;
