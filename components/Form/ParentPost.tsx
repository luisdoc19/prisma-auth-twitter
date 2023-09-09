"use client";
import { Like, Posts, PublicUsers } from "@prisma/client";
import React from "react";

import noUser from "@/public/no-user-image-icon-23.jpg";
import Image from "next/image";
import { getTimeAgoSinceCreated } from "@/utils/getTime";
import { BarChart2, MessageCircle, Repeat2 } from "lucide-react";
import LikeTweet from "./LikeTweet";
import PopoverShare from "./PopoverShare";
import { useRouter } from "next/navigation";
import { experimental_useOptimistic as useOptimistic } from "react";

type PostsWithUser = Posts & {
  user: PublicUsers;
  like: Like[];
  replies: Posts[] | [];
  like_length: number;
  user_liked: boolean;
};

const ParentPost = ({ post }: { post: PostsWithUser }) => {
  const router = useRouter();
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    PostsWithUser,
    PostsWithUser
  >(post, (currentTweet, newTweet) => {
    if (!currentTweet || !newTweet) return currentTweet;
    currentTweet = newTweet;
    return currentTweet;
  });

  return (
    <article className="w-full px-4 cursor-pointer">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col items-center">
          <Image
            src={optimisticTweets?.user.image || noUser}
            alt={post?.id || ""}
            width={900}
            height={900}
            className="w-[40px] h-[40px] rounded-full "
          />
          <div className="h-full w-1 rounded-md bg-zinc-600"></div>
        </div>
        <div className="w-full">
          <div className="flex flex-row gap-1 items-center">
            <h3 className="text-base font-semibold text-white ">
              {optimisticTweets?.user.name}
            </h3>
            <span className="text-sm text-zinc-500">
              @{optimisticTweets?.user.user_name}
            </span>
            <span
              className="text-zinc-500 block text-sm "
              suppressHydrationWarning
            >
              · {getTimeAgoSinceCreated(optimisticTweets?.createdAt)}
            </span>
          </div>
          <div
            onClick={() =>
              router.push(
                `/${optimisticTweets?.user.user_name}/status/${optimisticTweets?.id}`
              )
            }
          >
            <p className="text-[#e7e9ea]">{optimisticTweets?.text}</p>
          </div>
          <div className="flex flex-row justify-between w-full text-sm  mt-2 text-zinc-500">
            <div className="flex flex-row items-center  hover:text-sky-500">
              <div className="hover:bg-sky-500/10 rounded-full p-2 cursor-pointer">
                <MessageCircle size={18} />
              </div>
              <span className="ml-2">
                {optimisticTweets?.replies?.length || 0}
              </span>
            </div>
            <div className="flex flex-row items-center hover:text-green-600">
              <div className="hover:bg-green-600/10 rounded-full cursor-pointer p-2">
                <Repeat2 size={18} />
              </div>
              <span className="ml-2">0</span>
            </div>
            <LikeTweet
              post={optimisticTweets}
              addOptimisticPost={addOptimisticTweet}
            />
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
    </article>
  );
};

export default ParentPost;
