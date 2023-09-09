import { Settings } from "lucide-react";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full border-r border-zinc-600">
      <header className="w-full  backdrop-blur-lg backdrop-saturate-[37%] bg-[rgba(1,1,1, 1)] border-b border-zinc-600">
        <div className="flex flex-row justify-between p-4 items-center">
          <h2 className="text-xl font-bold">Notifications</h2>
          <Settings width={18} />
        </div>
        <div>
          <ul className="flex flex-row justify-evenly items-center">
            <li
              className={`text-sm cursor-pointer p-2 hover:text-white text-center hover:bg-zinc-900 w-full text-white font-bold border-b-4 border-sky-600`}
            >
              All
            </li>
            <li
              className={`text-sm cursor-pointer p-2 hover:text-white text-center hover:bg-zinc-900 w-full text-[#71767b]`}
            >
              Verified
            </li>
            <li
              className={`text-sm cursor-pointer p-2 hover:text-white text-center hover:bg-zinc-900 w-full text-[#71767b]`}
            >
              Mentions
            </li>
          </ul>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default layout;
