import ParentPost from "@/components/Form/ParentPost";
import PostTweet from "@/components/Form/PostView";
import PostsTweets from "@/components/Form/PostsTweets";
import RetrieveUser from "@/components/User/RetrieveUser";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "@/libs/prisma";

const page = async ({ params }: { params: { id: string; postId: string } }) => {
  const session: SessionWithExp | null = await getServerSession(authOptions);
  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  const publicUser: PublicUser = await prisma?.publicUsers.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const data = await prisma?.posts.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      user: true,
      like: true,
      parentPost: {
        include: {
          user: true,
          like: true,
          replies: true,
          parentPost: true,
        },
      },
      replies: {
        include: {
          user: true,
          like: true,
          replies: true,
          parentPost: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const PostWithUser: PostsWIthUser[] | null | undefined = data?.replies.map(
    (post) => ({
      ...post,
      like_length: post.like.length,
      user_liked: post.like
        .map((like) => like.user_id)
        .includes(session?.user?.id),
    })
  );

  const parentPost: PostsWIthUser = {
    ...data?.parentPost,
    like_length: data?.parentPost?.like.length,
    user_liked: data?.parentPost?.like
      .map((like) => like.user_id)
      .includes(session?.user?.id),
  };

  return (
    <>
      <div className="max-w-[600px] w-full overflow-y-auto">
        <div className="h-[100vh] border-r border-zinc-600">
          <header className=" p-4 flex flex-row items-center gap-4 sticky top-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-lg backdrop-saturate-[57%]  z-30">
            <RetrieveUser />
            <h2 className="text-white text-xl font-bold">Post</h2>
          </header>
          <main className="h-[93%] flex flex-col">
            {data?.parentPost && <ParentPost post={parentPost} />}
            <PostTweet post={data} id={publicUser} />
            <PostsTweets posts={PostWithUser} id={session.user.id} />
          </main>
        </div>
      </div>
    </>
  );
};

export default page;
