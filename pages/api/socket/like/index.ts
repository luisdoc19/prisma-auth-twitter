import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method === "POST") {
    const { id, postId } = req.body;
    if (!id || !postId) return res.json({ error: "Id or PostId are required" });

    const response = await prisma.like.create({
      data: {
        user_id: id,
        post_id: postId,
      },
      include: {
        post: {
          include: {
            user: true,
          },
        },
      },
    });

    const userNotification = `notification:${response.post.user_id}`;
    res?.socket?.server?.io?.emit(userNotification, response);

    if (!response) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    return res.json({ message: "Success" });
  }
}
