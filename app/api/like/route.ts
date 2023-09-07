import { prisma } from "@/libs/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, res: Response) {
  const { id, postId } = await req.json();
  const response = await prisma.like.delete({
    where: {
      user_id_post_id: {
        user_id: id,
        post_id: postId,
      },
    },
  });

  if (!response) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Success" });
}
