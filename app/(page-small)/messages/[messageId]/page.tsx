import MessageTexts from "@/components/Message/MessageTexts";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

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
    <div className="h-screen relative flex flex-col w-full justify-between p-3 pb-2 overflow-y-hidden overflow-hidden">
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
