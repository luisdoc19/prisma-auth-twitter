import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session: SessionWithExp | null = await getServerSession(authOptions);
  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  return (
    <div className="grid place-items-center h-full">
      <div className="w-[336px] flex flex-col">
        <h2 className="text-white font-bold text-3xl">Select a message</h2>
        <span className="mb-7 mt-2 text-zinc-600">
          Choose from your existing conversations, start a new one, or just keep
          swimming.
        </span>
        <button className="bg-[#4a99e9] w-max py-3 px-5 rounded-3xl font-bold">
          New message
        </button>
      </div>
    </div>
  );
};

export default page;
