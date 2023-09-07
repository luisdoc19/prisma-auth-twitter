"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Google = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        signIn("google");
      }}
      className="relative cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-[#ededed] bg-[#161616] hover:bg-[#232323] border-[#343434] hover:border-[#3e3e3e] dark:border-[#3e3e3e] hover:dark:border-[#505050] dark:bg-[#2e2e2e] dark:hover:bg-[#343434] focus-visible:outline[#10472f] shadow-sm w-full flex items-center justify-center text-base px-4 py-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-brand-google"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
      </svg>
      <span className="truncate">Continue with Google</span>
    </button>
  );
};

export default Google;
