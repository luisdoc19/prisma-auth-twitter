import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req: NextRequest, res: NextResponse) {
  const requestUrl = new URL(req.url);

  const id = requestUrl.searchParams.get("id");
  const otherUserId = requestUrl.searchParams.get("otherUserId");

  console.log(id, otherUserId);

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
