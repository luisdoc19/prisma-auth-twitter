"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const UserFollowNavigation = ({ username }: { username: string }) => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-row justify-evenly">
      <Link
        className={`text-sm cursor-pointer p-2 hover:text-white text-center hover:bg-zinc-900 w-full ${
          pathname?.split("/")[2] === "verified_followers"
            ? "text-white font-bold border-b-4 border-sky-600"
            : "text-zinc-500 font-normal"
        }`}
        href={`/${username}/verified_followers`}
      >
        Verified Followers
      </Link>
      <Link
        className={`text-sm cursor-pointer p-2 hover:text-white text-center hover:bg-zinc-900 w-full ${
          pathname?.split("/")[2] === "followers"
            ? "text-white font-bold border-b-4 border-sky-600"
            : "text-zinc-500 font-normal"
        }`}
        href={`/${username}/followers`}
      >
        Followers
      </Link>
      <Link
        href={`/${username}/following`}
        className={`text-sm cursor-pointer p-2 hover:text-white text-center hover:bg-zinc-900 w-full ${
          pathname?.split("/")[2] === "following"
            ? "text-white font-bold border-b-4 border-sky-600"
            : "text-zinc-500 font-normal"
        }`}
      >
        Following
      </Link>
    </ul>
  );
};

export default UserFollowNavigation;
