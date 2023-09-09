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
      <div className="max-w-[600px] w-full overflow-y-auto">
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
    </>
  );
}
2;
