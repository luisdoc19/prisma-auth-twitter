import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string; followingId: string } }
) {
  const { userId, followingId } = params;
  const unfollow = await prisma.follow.delete({
    where: {
      follower_id_following_id: {
        follower_id: userId,
        following_id: followingId,
      },
    },
  });
  if (!unfollow) return NextResponse.json({ status: false });

  return NextResponse.json({ status: true });
}
