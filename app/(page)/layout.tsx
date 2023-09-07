import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PublicUsers } from "@prisma/client";
import { authOptions } from "@/libs/authOptions";

import {
  Bookmark,
  Mail,
  MoreHorizontal,
  ScrollText,
  User as UserImage,
  Users2,
} from "lucide-react";

import DropdownMenu from "@/components/User/DropdownMenu";
import NotificationButton from "@/components/Notification/NotificationButton";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: SessionWithExp | null = await getServerSession(authOptions);

  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  const user: PublicUsers | null | undefined =
    await prisma?.publicUsers.findUnique({
      where: { id: session?.user?.id },
    });

  return (
    <div className="min-h-full">
      <div className="max-w-[1200px] grid grid-cols-[0.6fr_1.7fr_0.7fr] mx-auto h-[100vh] max-h-[100vh]">
        <aside className="border-r border-zinc-600 h-screen pt-2 pb-5 flex justify-between flex-col">
          <div>
            <div className="px-4">
              <Link href="/" className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-brand-twitter-filled"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M14.058 3.41c-1.807 .767 -2.995 2.453 -3.056 4.38l-.002 .182l-.243 -.023c-2.392 -.269 -4.498 -1.512 -5.944 -3.531a1 1 0 0 0 -1.685 .092l-.097 .186l-.049 .099c-.719 1.485 -1.19 3.29 -1.017 5.203l.03 .273c.283 2.263 1.5 4.215 3.779 5.679l.173 .107l-.081 .043c-1.315 .663 -2.518 .952 -3.827 .9c-1.056 -.04 -1.446 1.372 -.518 1.878c3.598 1.961 7.461 2.566 10.792 1.6c4.06 -1.18 7.152 -4.223 8.335 -8.433l.127 -.495c.238 -.993 .372 -2.006 .401 -3.024l.003 -.332l.393 -.779l.44 -.862l.214 -.434l.118 -.247c.265 -.565 .456 -1.033 .574 -1.43l.014 -.056l.008 -.018c.22 -.593 -.166 -1.358 -.941 -1.358l-.122 .007a.997 .997 0 0 0 -.231 .057l-.086 .038a7.46 7.46 0 0 1 -.88 .36l-.356 .115l-.271 .08l-.772 .214c-1.336 -1.118 -3.144 -1.254 -5.012 -.554l-.211 .084z"
                    strokeWidth="0"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
            </div>
            <ul className="mt-2">
              <li>
                <Link
                  href="/"
                  className="flex flex-row gap-4 hover:bg-zinc-800 w-max px-4 py-3 rounded-3xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-home font-bold text-xl text-white"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span className="text-white font-bold text-xl">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="?explore=true"
                  className="flex flex-row gap-4 hover:bg-zinc-800 w-max px-4 py-3 rounded-3xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-search"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                    <path d="M21 21l-6 -6"></path>
                  </svg>
                  <span className="text-white text-xl">Explore</span>
                </Link>
              </li>
              <li>
                <NotificationButton id={session.user.id} />
              </li>
              <li>
                <Link
                  href="/messages"
                  className="flex flex-row gap-4 hover:bg-zinc-800 w-max px-4 py-3 rounded-3xl"
                >
                  <Mail />
                  <span className="text-white text-xl">Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="flex flex-row gap-4 hover:bg-zinc-800 w-max px-4 py-3 rounded-3xl"
                >
                  <ScrollText />
                  <span className="text-white text-xl">Lists</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="flex flex-row gap-4 hover:bg-zinc-800 w-max px-4 py-3 rounded-3xl"
                >
                  <Bookmark fill="true" />
                  <span className="text-white text-xl">Bookmarks</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="flex flex-row gap-4 hover:bg-zinc-800 w-max px-4 py-3 rounded-3xl"
                >
                  <Users2 />
                  <span className="text-white text-xl">Communities</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className="flex flex-row gap-4 hover:bg-zinc-800 w-max px-4 py-3 rounded-3xl"
                >
                  <UserImage />
                  <span className="text-white text-xl">Profile</span>
                </Link>
              </li>

              <li>
                <Link
                  href={"/"}
                  className="flex flex-row gap-4 hover:bg-zinc-800 w-max px-4 py-3 rounded-3xl"
                >
                  <MoreHorizontal />
                  <span className="text-white text-xl">More</span>
                </Link>
              </li>
              <li className="mt-5">
                <Link href={"/post/create"}>
                  <button className="bg-primary text-white font-bold text-xl bg-sky-600 rounded-full px-20 py-3 w-max">
                    Post
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-end">
            <DropdownMenu publicUser={user} />
          </div>
        </aside>
        <main>{children}</main>
        <aside className="border-l border-zinc-600 h-screen"></aside>
      </div>
    </div>
  );
}
