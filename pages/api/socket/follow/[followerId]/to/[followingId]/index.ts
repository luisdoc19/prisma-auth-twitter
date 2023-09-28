import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method === "POST") {
    try {
      const { followerId, followingId } = req.query;
      console.log(followerId, followingId);
      if (!followerId || !followingId)
        return res.status(400).json({ ok: false });

      const followerUser = await prisma.publicUsers.findUnique({
        where: {
          id: followerId as string,
        },
      });

      const followingUser = await prisma.publicUsers.findUnique({
        where: {
          id: followingId as string,
        },
      });

      if (!followerUser || !followingUser)
        return res.status(404).json({ ok: false });

      console.log(followerUser, followingUser);

      try {
        const follow = await prisma.follow.create({
          data: {
            follower_id: followerUser.id,
            following_id: followingUser.id,
          },
        });
        const createNotification = await prisma.notifications.create({
          data: {
            type: "follow",
            followId: follow.id,
            userId: followingUser.id,
          },
          include: {
            follow: {
              include: {
                following: true,
                follower: true,
              },
            },
            like: {
              include: {
                user: true,
                post: {
                  include: {
                    user: true,
                  },
                },
              },
            },
            user: true,
          },
        });

        const userNotification = `notification:${createNotification.userId}`;
        res?.socket?.server?.io?.emit(userNotification, createNotification);

        return res.json({ ok: true });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") return res.json({ ok: false });
        }
        throw e;
      }
    } catch (error) {
      return res.status(404).json({ ok: false });
    }
  }
}
