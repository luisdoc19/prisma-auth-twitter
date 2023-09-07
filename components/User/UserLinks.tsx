"use client";
import { Posts, PublicUsers } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type UserWithPosts = PublicUsers & {
  posts: Posts[];
};

const UserLinks = ({ user }: { user: UserWithPosts | undefined | null }) => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-row justify-evenly items-center">
      <Link
        href={`/${user?.user_name}`}
        className={`text-sm cursor-pointer p-2 hover:text-white text-center hover:bg-zinc-900 w-full ${
          pathname?.split("/")[1] === user?.user_name &&
          !pathname?.split("/")[2]
            ? "text-white font-bold border-b-4 border-sky-600"
            : "text-[#71767b]"
        }`}
      >
        <li>Posts</li>
      </Link>
      <Link
        href={`/${user?.user_name}/replies`}
        className={`text-sm cursor-pointer  p-2 hover:text-white text-center hover:bg-zinc-900 w-full ${
          pathname?.split("/")[2] === "replies"
            ? "text-white font-bold border-b-4 border-sky-600"
            : "text-[#71767b]"
        }`}
      >
        <li>Replies</li>
      </Link>
      <Link
        href={`/${user?.user_name}/highlights`}
        className={`text-sm cursor-pointer  p-2 hover:text-white text-center hover:bg-zinc-900 w-full ${
          pathname?.split("/")[2] === "highlights"
            ? "text-white font-bold border-b-4 border-sky-600"
            : "text-[#71767b]"
        }`}
      >
        <li>Highlights</li>
      </Link>
      <Link
        href={`/${user?.user_name}/media`}
        className={`text-sm cursor-pointer  p-2 hover:text-white text-center hover:bg-zinc-900 w-full ${
          pathname?.split("/")[2] === "media"
            ? "text-white font-bold border-b-4 border-sky-600"
            : "text-[#71767b]"
        }`}
      >
        <li>Media</li>
      </Link>
      <Link
        href={`/${user?.user_name}/likes`}
        className={`text-sm cursor-pointer  p-2 hover:text-white text-center hover:bg-zinc-900 w-full ${
          pathname?.split("/")[2] === "likes"
            ? "text-white font-bold border-b-4 border-sky-600"
            : "text-[#71767b]"
        }`}
      >
        <li>Likes</li>
      </Link>
    </ul>
  );
};

export default UserLinks;
