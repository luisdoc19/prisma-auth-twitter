import PostsTweets from "@/components/Form/PostsTweets";
import { authOptions } from "@/libs/authOptions";
import { Like, PublicUsers } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const session: SessionWithExp | null = await getServerSession(authOptions);
  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  const user: PublicUsers | null | undefined =
    await prisma?.publicUsers.findUnique({
      where: { id: session?.user?.id },
    });

  const postsByUser: PostsWIthUser[] | null | undefined =
    await prisma?.posts.findMany({
      where: {
        user: {
          user_name: params.id,
        },
      },
      include: {
        user: true,
        like: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const posts = postsByUser?.map((post) => ({
    ...post,
    like_length: post.like.length,
    user_liked: post.like.map((like: Like) => like.user_id).includes(user?.id),
  }));

  return <PostsTweets posts={posts} id={session.user.id} />;
};

export default page;
