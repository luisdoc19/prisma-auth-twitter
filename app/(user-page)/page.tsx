import { Session, User, getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";
import { Like, Posts, PublicUsers } from "@prisma/client";
import PostForm from "@/components/Form/PostForm";
import PostsTweets from "@/components/Form/PostsTweets";
import UserMessage from "@/components/User/UserMessage";

import noUser from "@/public/no-user-image-icon-23.jpg";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session: SessionWithExp | null = await getServerSession(authOptions);
  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  const user: PublicUsers | null | undefined =
    await prisma?.publicUsers.findUnique({
      where: { id: session?.user?.id },
    });

  const data = await prisma?.posts.findMany({
    where: {
      replied_id: null,
    },
    include: {
      user: true,
      like: true,
      replies: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const message = await prisma?.message.findMany({
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

  const messages = message?.map((msg) => {
    const user =
      (msg.userOne_id === session?.user?.id && msg.userTwo) ||
      (msg.userTwo_id === session?.user?.id && msg.userOne);

    return {
      ...msg,
      user,
    };
  });

  const posts: PostsWIthUser[] | null | undefined = data?.map((post) => ({
    ...post,
    like_length: post.like.length,
    user_liked: post.like
      .map((like) => like.user_id)
      .includes(session?.user?.id),
  }));

  return (
    <>
      <div className="sm:w-[600px] max-lg:max-w-[600px]  overflow-y-auto">
        <div className="h-[100vh]">
          <header className=" border-b border-zinc-800/60 p-4 sticky top-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-lg backdrop-saturate-[57%] border-r z-30">
            <h2 className="text-white text-xl font-bold">Home</h2>
          </header>
          <main className="h-[93%] flex flex-col">
            <div className="flex flex-row w-full p-4 border-b border-zinc-800">
              <div>
                <Link href={`/${user?.user_name}`}>
                  <Image
                    width={900}
                    height={900}
                    src={user?.image || noUser}
                    alt={user?.name || user?.id || ""}
                    className="w-[42px] rounded-full"
                  />
                </Link>
              </div>
              <PostForm session={user?.id} />
            </div>
            <section>
              <PostsTweets posts={posts} id={session?.user?.id} />
            </section>
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
2;
