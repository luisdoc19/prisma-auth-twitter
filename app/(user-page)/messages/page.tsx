import UserProfileChat from "@/components/User/UserProfileChat";
import { authOptions } from "@/libs/authOptions";
import { PublicUsers } from "@prisma/client";
import { MailPlus, Settings } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session: SessionWithExp | null = await getServerSession(authOptions);
  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  const user: PublicUsers | null | undefined =
    await prisma?.publicUsers.findUnique({
      where: { id: session?.user?.id },
    });

  const data = await prisma?.message.findMany({
    where: {
      OR: [
        {
          userOne_id: session?.user?.id,
        },
        {
          userTwo_id: session?.user?.id,
        },
      ],
    },
    include: {
      directMessage: true,
      userOne: true,
      userTwo: true,
    },
  });

  const messages: MessageWithUsers[] | undefined = data?.map((msg) => {
    const user =
      (msg.userTwo_id === session?.user?.id && msg.userOne) ||
      (msg.userOne_id === session?.user?.id && msg.userTwo);

    return {
      ...msg,
      user,
    };
  });

  return (
    <>
      <div className="grid place-items-center h-full max-lg:hidden max-lg:opacity-0">
        <div className="w-[336px] flex flex-col">
          <h2 className="text-white font-bold text-3xl">Select a message</h2>
          <span className="mb-7 mt-2 text-zinc-600">
            Choose from your existing conversations, start a new one, or just
            keep swimming.
          </span>
          <button className="bg-[#4a99e9] w-max py-3 px-5 rounded-3xl font-bold">
            New message
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        <header className="flex flex-row justify-between p-4">
          <div>
            <h2 className="text-xl font-bold">Messages</h2>
          </div>
          <div className="flex flex-row gap-2">
            <Settings />
            <MailPlus />
          </div>
        </header>
        <main>
          <div className="p-4">
            <input
              placeholder="Search Direct Messages"
              type="search"
              className="bg-black w-full py-2 px-4 rounded-3xl border text-zinc-800 border-zinc-500 outline-none text-sm"
            />
          </div>
          <div>
            <UserProfileChat messages={messages} />
          </div>
        </main>
      </div>
    </>
  );
};

export default page;
