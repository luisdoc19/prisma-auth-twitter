import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Posts, PublicUsers } from "@prisma/client";
import { authOptions } from "@/libs/authOptions";

import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  Mail,
  MoreHorizontal,
  ScrollText,
  User as UserImage,
  Users2,
} from "lucide-react";

import DropdownMenu from "@/components/User/DropdownMenu";

import noBackground from "@/public/no-image.png";
import noUser from "@/public/no-user-image-icon-23.jpg";
import UserLinks from "@/components/User/UserLinks";
import UserFollowButton from "@/components/User/UserFollowButton";
import UserChangeInfo from "@/components/User/UserChangeInfo";
import NotificationButton from "@/components/Notification/NotificationButton";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type UserWithPosts = PublicUsers & {
  posts: Posts[];
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const session: SessionWithExp | null = await getServerSession(authOptions);

  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  const user: UserWithPosts | null | undefined =
    await prisma?.publicUsers.findUnique({
      where: { user_name: params.id },
      include: { posts: true },
    });

  return (
    <>
      <div className="max-w-[600px] w-full overflow-y-auto">
        <div className="h-[100vh]">
          <header className="border-b border-zinc-600">
            <div className="flex flex-row px-4 py-1 items-center gap-8 sticky top-0 backdrop-blur-lg backdrop-saturate-[37%] bg-[rgba(0,0,0,0.64)]  z-30">
              <Link href="/">
                <ArrowLeft width={18} />
              </Link>
              <div className="flex flex-col">
                <h2 className="text-xl text-white font-bold">{user?.name}</h2>
                <span className="text-sm text-zinc-500">
                  {user?.posts?.length} posts
                </span>
              </div>
            </div>
            <div>
              <Image
                src={noBackground}
                className="max-w-[100%] h-auto block"
                width={1920}
                height={1080}
                alt=""
              />
            </div>
            <div className="ml-4 flex flex-row h-20 justify-between">
              <div>
                <Image
                  src={user?.image || noUser}
                  width={600}
                  height={600}
                  className="w-[100px] relative top-[-50px] rounded-full border-3 border-[#1c1c1c] sm:w-[140px] sm:top-[-70px]"
                  alt=""
                />
              </div>
              <div>
                {user && user.id === session.user.id ? (
                  <UserChangeInfo id={session.user.id} />
                ) : (
                  <UserFollowButton
                    id={session?.user?.id}
                    otherUserId={user?.id}
                  />
                )}
              </div>
            </div>
            <div className="px-4">
              <div className="flex flex-col py-2">
                <h2 className="text-white font-bold w-max text-xl cursor-pointer hover:underline">
                  {user?.name}
                </h2>
                <span className="text-zinc-500 block text-sm cursor-pointer">
                  @{user?.user_name}
                </span>
              </div>
              <div>
                <span className="text-[#e7e9ea] text-sm">{user?.bio}</span>
              </div>
              <div className="flex flex-row mt-2 text-zinc-500  text-sm gap-2 items-center">
                <CalendarDays width={18} />
                <span>
                  Se unio en{" "}
                  {new Date(user ? user?.createdAt : "").toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-row gap-2 mt-2 text-sm">
                <span className="flex flex-row gap-1 cursor-pointer hover:underline font-extralight">
                  <strong className="text-white font-bold block text-md">
                    0
                  </strong>
                  Siguiendo
                </span>
                <span className="ml-2 flex flex-row gap-1 cursor-pointer hover:underline font-extralight">
                  <strong className="text-white font-bold block text-md">
                    12
                  </strong>
                  Seguidores
                </span>
              </div>
            </div>
            <div className="mt-4">
              <UserLinks user={user} />
            </div>
          </header>
          <main className="h-[93%] flex flex-col">
            <section>{children}</section>
          </main>
        </div>
      </div>
      <aside className="h-screen flex max-w-[300px] flex-col gap-3 max-lg:hidden">
        <div className="w-full mt-2">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#212327] py-2 px-4 text-sm rounded-3xl outline-none active:border active:border-sky-600 focus:border-sky-600 focus:border  text-white"
          />
        </div>
        <div className="bg-[#16181c] p-4 rounded-2xl">
          <h3 className="text-white text-xl font-bold">Subscribe to Premium</h3>
          <span className="font-medium">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </span>
          <button className="rounded-3xl px-4 py-2 bg-sky-600 mt-2 font-semibold">
            Subscribe
          </button>
        </div>
        <div className="bg-[#16181c] rounded-2xl">
          <h3 className="text-white text-xl font-bold px-4 pt-4 ">
            What&apos;s happeng
          </h3>
          <div className="flex flex-col">
            <div className="w-full hover:bg-zinc-800 py-2 px-4 cursor-pointer">
              <span className="text-sm text-zinc-500">Treding in Colombia</span>
              <h4 className="text-white font-semibold">#golgolcaracol</h4>
            </div>
            <div className="w-full hover:bg-zinc-800 py-2 px-4 cursor-pointer">
              <span className="text-sm text-zinc-500">Sports Trending</span>
              <h4 className="text-white font-semibold">Feid</h4>
            </div>
            <div className="w-full hover:bg-zinc-800 py-2 px-4 cursor-pointer rounded-b-2xl">
              <span className="text-sm text-zinc-500">Business & fiance</span>
              <h4 className="text-white font-semibold">Musk</h4>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}