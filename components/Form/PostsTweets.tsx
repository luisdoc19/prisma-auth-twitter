"use client";
import { Like, Posts, PublicUsers } from "@prisma/client";
import React from "react";
import { BarChart2, MessageCircle, Repeat2 } from "lucide-react";
import PopoverShare from "./PopoverShare";
import LikeTweet from "./LikeTweet";
import { experimental_useOptimistic as useOptimistic } from "react";
import { UserHover } from "../User/UserHover";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTimeAgoSinceCreated } from "@/utils/getTime";

type PostsWithUser = Posts & {
  user: PublicUsers;
  like: Like[];
  replies: Posts[] | [];
  like_length: number;
  user_liked: boolean;
};

const PostsTweets = ({
  posts,
  id,
}: {
  posts: PostsWithUser[] | undefined;
  id: string;
}) => {
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    PostsWithUser[] | undefined,
    PostsWithUser | undefined
  >(posts, (currentTweet, newTweet) => {
    if (!currentTweet || !newTweet) return currentTweet;
    const newOptimisticTweet = [...currentTweet];
    const index = newOptimisticTweet.findIndex(
      (post) => post.id === newTweet?.id
    );
    newOptimisticTweet[index] = newTweet;
    return newOptimisticTweet;
  });

  const router = useRouter();

  return optimisticTweets?.map((post) => (
    <div
      key={post.id}
      className="w-full border-b border-zinc-600 flex flex-row px-4 py-2 gap-3 cursor-pointer }"
    >
      <div>
        <UserHover user={post.user} id={id} />
      </div>
      <div className="w-full">
        <div className="flex flex-row gap-1 items-center">
          <Link href={`/${post.user.user_name}`}>
            <h3 className="text-white font-bold text-md">{post?.user?.name}</h3>
          </Link>

          <Link href={`/${post.user.user_name}`}>
            <span className="text-zinc-500 text-sm">
              @{post?.user?.user_name || "luisdoc19"}
            </span>
          </Link>

          <span
            className="text-zinc-500 block text-sm "
            suppressHydrationWarning
          >
            · {getTimeAgoSinceCreated(post.createdAt)}
          </span>
        </div>
        <div
          onClick={() =>
            router.push(`/${post.user.user_name}/status/${post.id}`)
          }
        >
          <p className="text-[#e7e9ea]">{post.text}</p>
        </div>
        <div className="flex flex-row justify-between w-full text-sm  mt-2 text-zinc-500">
          <div className="flex flex-row items-center  hover:text-sky-500">
            <div className="hover:bg-sky-500/10 rounded-full p-2 cursor-pointer">
              <MessageCircle size={18} />
            </div>
            <span className="ml-2">{post?.replies?.length || 0}</span>
          </div>
          <div className="flex flex-row items-center hover:text-green-600">
            <div className="hover:bg-green-600/10 rounded-full cursor-pointer p-2">
              <Repeat2 size={18} />
            </div>
            <span className="ml-2">0</span>
          </div>
          <LikeTweet post={post} addOptimisticPost={addOptimisticTweet} />
          <div className="flex flex-row items-center hover:text-sky-500">
            <div className="hover:bg-sky-500/10 rounded-full cursor-pointer p-2">
              <BarChart2 size={18} />
            </div>
            <span className="ml-2">0</span>
          </div>
          <div className="flex items-center">
            <PopoverShare />
          </div>
        </div>
      </div>
    </div>
  ));
};

export default PostsTweets;
