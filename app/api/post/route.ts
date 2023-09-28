import { NextResponse } from "next/server";
import { Session, User, getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { prisma } from "@/libs/prisma";

type SessionWithExp = Session & {
  user: User & {
    id: string;
  };
  exp: number;
};

export async function POST(req: Request, res: Response) {
  const session: SessionWithExp | null = await getServerSession(authOptions);
  if (!session || session.exp < Date.now() / 1000)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!req.body)
    return NextResponse.json({ error: "No body" }, { status: 400 });

  const user = await prisma?.publicUsers.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { post, session: id } = await req.json();

  if (!post || !id)
    return NextResponse.json({ error: "No post or session" }, { status: 400 });

  const createPost = await prisma?.posts.create({
    data: {
      text: post,
      user_id: user.id,
    },
    include: {
      user: true,
    },
  });

  return NextResponse.json(createPost);
}
