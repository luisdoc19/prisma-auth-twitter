import { Like, Posts } from "@prisma/client";
import Image from "next/image";
import React from "react";

import noUser from "@/public/no-user-image-icon-23.jpg";
import { BarChart2, Heart, MessageCircle, Repeat2 } from "lucide-react";
import LikeTweet from "./LikeTweet";
import PopoverShare from "./PopoverShare";
import ReplyForm from "./ReplyForm";

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

const PostView = ({
  post,
  id,
}: {
  post: PostView | undefined | null;
  id: PublicUser;
}) => {
  return (
    <>
      <article className="w-full px-4">
        <div className="flex flex-row gap-3">
          <Image
            src={post?.user.image || noUser}
            alt={post?.id || ""}
            width={900}
            height={900}
            className="w-[40px] h-[40px] rounded-full "
          />
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-white ">
              {post?.user.name}
            </h3>
            <span className="text-sm text-zinc-500">
              @{post?.user.user_name}
            </span>
          </div>
        </div>
        <div className="mt-3">
          <p>{post?.text}</p>
        </div>
        <div className="py-2">
          <span className="text-zinc-500 text-base ">
            {post?.createdAt.toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
            })}{" "}
            · {post?.createdAt.toDateString()}
          </span>
        </div>
        <div className="flex flex-row py-3 border-y border-zinc-600">
          <div className="flex flex-row gap-2 mr-4">
            <span className="text-white font-bold text-sm">3,171</span>
            <span className="text-sm text-zinc-500">Reposts</span>
          </div>

          <div className="flex flex-row gap-2 mr-4">
            <span className="text-white font-bold text-sm">
              {post?.like.length}
            </span>
            <span className="text-sm text-zinc-500">Likes</span>
          </div>
          <div className="flex flex-row gap-2">
            <span className="text-white font-bold text-sm">34</span>
            <span className="text-sm text-zinc-500">Bookmarks</span>
          </div>
        </div>
        <div className="flex flex-row py-2 border-b border-zinc-600 justify-around">
          <div className="flex flex-row items-center  hover:text-sky-500  text-zinc-500">
            <div className="hover:bg-sky-500/10 rounded-full p-2 cursor-pointer">
              <MessageCircle size={18} />
            </div>
          </div>
          <div className="flex flex-row items-center hover:text-green-600  text-zinc-500">
            <div className="hover:bg-green-600/10 rounded-full cursor-pointer p-2">
              <Repeat2 size={18} />
            </div>
          </div>
          <div className="flex flex-row items-center hover:text-red-600 text-zinc-500">
            <div className="hover:bg-red-600/10 rounded-full cursor-pointer p-2">
              {false ? (
                <Heart size={18} fill="red" color="red" />
              ) : (
                <Heart size={18} className="" />
              )}
            </div>
          </div>
          <div className="flex flex-row items-center hover:text-sky-500  text-zinc-500">
            <div className="hover:bg-sky-500/10 rounded-full cursor-pointer p-2">
              <BarChart2 size={18} />
            </div>
          </div>
          <div className="flex items-center  text-zinc-500">
            <PopoverShare />
          </div>
        </div>
      </article>
      <ReplyForm post={post} id={id} />
    </>
  );
};

export default PostView;
