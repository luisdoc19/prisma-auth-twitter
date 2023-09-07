import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
export async function GET(req: NextResponse, res: Response) {
  const requestUrl = new URL(req.url);

  const id = requestUrl.searchParams.get("id");
  const otherUserId = requestUrl.searchParams.get("otherUserId");

  if (!id || !otherUserId) return;

  const message = await prisma?.message.findFirst({
    where: {
      OR: [
        {
          userOne_id: id,
          userTwo_id: otherUserId,
        },
        {
          userOne_id: otherUserId,
          userTwo_id: id,
        },
      ],
    },
  });

  if (!message) {
    const message = await prisma?.message.create({
      data: {
        userOne_id: id,
        userTwo_id: otherUserId,
      },
    });
    return NextResponse.json({ link: message.id });
  }
  return NextResponse.json({ link: message.id });
}
