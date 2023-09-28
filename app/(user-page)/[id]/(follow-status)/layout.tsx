import RetrieveUser from "@/components/User/RetrieveUser";
import UserFollowNavigation from "@/components/User/UserFollowNavigation";
import { authOptions } from "@/libs/authOptions";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const session: SessionWithExp | null = await getServerSession(authOptions);

  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  const user = await prisma?.publicUsers.findUnique({
    where: {
      user_name: params.id,
    },
  });

  return (
    <div className="w-full border-r border-zinc-600">
      <header className="flex flex-col sticky top-0 backdrop-blur-lg backdrop-saturate-[37%] bg-[rgba(0,0,0,0.64)]  z-30 border-b border-zinc-600">
        <div className="flex flex-row px-4 py-1 items-center gap-8">
          <RetrieveUser />
          <div className="flex flex-col">
            <h2 className="text-xl text-white font-bold">{user?.name}</h2>
            <span className="text-sm text-zinc-500">@{user?.user_name}</span>
          </div>
        </div>
        <div>
          <UserFollowNavigation username={user?.user_name as string} />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default layout;
