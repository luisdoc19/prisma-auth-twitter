import PostTweet from "@/components/Form/PostView";
import PostsTweets from "@/components/Form/PostsTweets";
import { authOptions } from "@/libs/authOptions";
import { Like, Posts } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type PostView = Posts & {
  user: {
    id: string;
    name: string;
    email: string | null;
    user_name: string | null;
    password: string | null;
    emailVerified: boolean | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  like: Like[];
  replies: Posts &
    {
      like: Like[];
      user: {
        id: string;
        name: string;
        email: string | null;
        user_name: string | null;
        password: string | null;
        emailVerified: boolean | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
    }[];
};

type PublicUser =
  | {
      id: string;
      name: string;
      email: string | null;
      password: string | null;
      bio: string | null;
      user_name: string | null;
      emailVerified: boolean;
      image: string | null;
      createdAt: Date;
      updatedAt: Date;
    }
  | null
  | undefined;

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
      replies: {
        include: {
          user: true,
          like: true,
          replies: true,
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

  return (
    <>
      <div className="sm:w-[600px] max-lg:max-w-[600px] border-r border-zinc-600 overflow-y-auto">
        <div className="h-[100vh]">
          <header className=" p-4 flex flex-row items-center gap-4 sticky top-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-lg backdrop-saturate-[57%]  z-30">
            <ArrowLeft className="cursor-pointer" />
            <h2 className="text-white text-xl font-bold">Post</h2>
          </header>
          <main className="h-[93%] flex flex-col">
            <PostTweet post={data} id={publicUser} />
            <PostsTweets posts={PostWithUser} id={session.user.id} />
          </main>
        </div>
      </div>
      <aside className="h-screen flex max-w-[300px] flex-col gap-3 max-lg:hidden">
        <div className="w-full mt-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#212327] py-2 px-4 text-sm rounded-3xl outline-none active:border active:border-sky-600 focus:border-sky-600 focus:border  text-white"
          />
        </div>
        <div className="bg-[#16181c] p-4 rounded-2xl">
          <h3 className="text-white text-xl font-bold">Subscribe to Premium</h3>
          <span className="font-medium">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </span>
          <button className="rounded-3xl px-4 py-2 bg-sky-600 mt-2 font-semibold">
            Subscribe
          </button>
        </div>
        <div className="bg-[#16181c] rounded-2xl">
          <h3 className="text-white text-xl font-bold px-4 pt-4 ">
            What&apos;s happeng
          </h3>
          <div className="flex flex-col">
            <div className="w-full hover:bg-zinc-800 py-2 px-4 cursor-pointer">
              <span className="text-sm text-zinc-500">Treding in Colombia</span>
              <h4 className="text-white font-semibold">#golgolcaracol</h4>
            </div>
            <div className="w-full hover:bg-zinc-800 py-2 px-4 cursor-pointer">
              <span className="text-sm text-zinc-500">Sports Trending</span>
              <h4 className="text-white font-semibold">Feid</h4>
            </div>
            <div className="w-full hover:bg-zinc-800 py-2 px-4 cursor-pointer rounded-b-2xl">
              <span className="text-sm text-zinc-500">Business & fiance</span>
              <h4 className="text-white font-semibold">Musk</h4>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default page;
