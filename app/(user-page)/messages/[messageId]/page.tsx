import MessageTexts from "@/components/Message/MessageTexts";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

import noUser from "@/public/no-user-image-icon-23.jpg";
import Link from "next/link";

const page = async ({ params }: { params: { messageId: string } }) => {
  const session: SessionWithExp | null = await getServerSession(authOptions);
  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  const data = await prisma?.message.findUnique({
    where: {
      id: params.messageId,
    },
    include: {
      userOne: true,
      userTwo: true,
    },
  });

  const directMessage: directMessageSender[] | undefined =
    await prisma?.directMessage.findMany({
      where: {
        messageId: params.messageId,
      },
      include: {
        sender: true,
      },
    });

  const user =
    (data?.userOne_id === session?.user?.id && data?.userTwo) ||
    (data?.userTwo_id === session?.user?.id && data?.userOne);

  const message = {
    ...data,
    user,
  };

  return (
    <div className="h-screen relative flex flex-col w-full justify-between pb-2 overflow-y-auto">
      <header className="w-full sticky top-0 bg-[rgba(0,0,0,0.3)] p-3 backdrop-blur-lg backdrop-saturate-[57%] flex flex-row gap-4 items-center">
        <Link href={`/${message.user !== false && message.user.user_name}`}>
          <Image
            src={noUser}
            alt=""
            width={900}
            height={900}
            className="w-[30px] rounded-full h-auto cursor-pointer"
          />
        </Link>
        <span className="font-semibold text-white">
          {message.user !== false && message.user.user_name}
        </span>
      </header>
      <MessageTexts
        directMessage={directMessage}
        message={message}
        id={session.user.id}
        // @ts-ignore
        suppressHydrationWarning
      />
    </div>
  );
};

export default page;
