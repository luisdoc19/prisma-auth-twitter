import { signIn } from "next-auth/react";
import React from "react";

const Github = () => {
  return (
    <button
      onClick={() => signIn("github")}
      className="relative cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-[#ededed] bg-[#161616] hover:bg-[#232323] border-[#343434] hover:border-[#3e3e3e] dark:border-[#3e3e3e] hover:dark:border-[#505050] dark:bg-[#2e2e2e] dark:hover:bg-[#343434] focus-visible:outline[#10472f] shadow-sm w-full flex items-center justify-center text-base px-4 py-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sbui-icon "
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
      <span className="truncate">Continue with GitHub</span>
    </button>
  );
};

export default Github;
