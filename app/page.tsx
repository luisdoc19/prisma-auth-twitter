import { Session, User, getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";
import { Like, Posts, PublicUsers } from "@prisma/client";
import PostForm from "@/components/Form/PostForm";
import PostsTweets from "@/components/Form/PostsTweets";

type SessionWithExp = Session & {
  user: User & {
    id: string;
  };
  exp: number;
};

type PostsWIthUser = Posts & {
  user: PublicUsers;
  like: Like[];
};

export default async function Home() {
  const session: SessionWithExp | null = await getServerSession(authOptions);
  if (!session?.user || session?.exp < Date.now() / 1000) redirect("/sign-in");

  const user: PublicUsers | null | undefined =
    await prisma?.publicUsers.findUnique({
      where: { id: session?.user?.id },
    });

  const data: PostsWIthUser[] | null | undefined = await prisma?.posts.findMany(
    {
      include: {
        user: true,
        like: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }
  );
  const posts = data?.map((post) => ({
    ...post,
    like_length: post.like.length,
    user_liked: post.like
      .map((like) => like.user_id)
      .includes(session?.user?.id),
  }));

  return (
    <div className="h-[100vh]">
      <header className="w-full border-b border-zinc-800/60 p-4 backdrop-blur-lg backdrop-saturate-[37%] border-r z-30">
        <h2 className="text-white text-xl font-bold">Home</h2>
      </header>
      <main className="overflow-y-scroll h-[93%] flex flex-col">
        <div className="flex flex-row  w-full p-4 border-b border-zinc-800">
          <div>
            <img
              src={user?.image || ""}
              alt={user?.name}
              className="w-[42px] rounded-full"
            />
          </div>
          <PostForm session={user?.id} />
        </div>
        <section>
          <PostsTweets posts={posts} />
        </section>
      </main>
    </div>
  );
}
2;
