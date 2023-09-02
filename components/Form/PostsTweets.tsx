"use client";
import { Posts, PublicUsers } from "@prisma/client";
import React from "react";
import { BarChart2, MessageCircle, Repeat2 } from "lucide-react";
import PopoverShare from "./PopoverShare";
import LikeTweet from "./LikeTweet";
import { experimental_useOptimistic as useOptimistic } from "react";

type PostsWithUser = Posts & {
  user: PublicUsers | null | undefined;
};

const PostsTweets = ({ posts }: { posts: PostsWithUser[] | undefined }) => {
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

  function getTimeAgoSinceCreated(created_at: Date) {
    const currentTime = new Date();
    const createdAtDate = new Date(created_at);

    const timeDifference = currentTime.getTime() - createdAtDate.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      const createdAtDay = createdAtDate.getDate();
      const createdAtMonth = createdAtDate.toLocaleString("default", {
        month: "short",
      });
      return `${createdAtDay} ${createdAtMonth}`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${seconds}s`;
    }
  }

  return optimisticTweets?.map((post) => (
    <div
      key={post.id}
      className="w-full border-b border-zinc-800 flex flex-row px-4 py-2 gap-3 cursor-pointer"
    >
      <div>
        <img
          src={post?.user?.image || ""}
          alt={post.user_id}
          className="w-[42px] rounded-full"
        />
      </div>
      <div className="w-full">
        <div className="flex flex-row gap-1 items-center">
          <h3 className="text-white font-bold text-md">{post?.user?.name}</h3>
          <span className="text-zinc-500 text-sm">
            @{post?.user?.user_name || "luisdoc19"}
          </span>
          <span
            className="text-zinc-500 block text-sm "
            suppressHydrationWarning
          >
            · {getTimeAgoSinceCreated(post.createdAt)}
          </span>
        </div>
        <div>
          <p className="text-[#e7e9ea]">{post.text}</p>
        </div>
        <div className="flex flex-row justify-between w-full text-sm  mt-2 text-zinc-500">
          <div className="flex flex-row items-center  hover:text-sky-500">
            <div className="hover:bg-sky-500/10 rounded-full p-2 cursor-pointer">
              <MessageCircle size={18} />
            </div>
            <span className="ml-2">0</span>
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
