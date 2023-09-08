import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function POST(req: Request, res: Response) {
  const { replyText, post_replied_id, user_id } = await req.json();
  console.log("replyText", replyText);

  if (!replyText || !post_replied_id || !user_id) {
    return NextResponse.json({ message: "Invalid request" });
  }

  const createPost = await prisma.posts.create({
    data: {
      text: replyText,
      user_id: user_id,
      replied_id: post_replied_id,
    },
  });

  return NextResponse.json(createPost);
}
