import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { prisma } from "@/libs/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method === "POST") {
    try {
      const { messageId } = req.query;
      const { userId, message, file } = req.body;

      if (!messageId) {
        return res
          .status(401)
          .json({ error: "MessageId or Conversation must be created" });
      }

      if (!userId || !message) {
        return res
          .status(401)
          .json({ error: "UserId or context are required" });
      }

      const newDirectMessage = await prisma?.directMessage.create({
        data: {
          senderId: userId,
          content: message,
          messageId: messageId as string,
        },
        include: {
          sender: true,
        },
      });

      const channelKey = `chat:${messageId}:messages`;

      res?.socket?.server?.io?.emit(channelKey, newDirectMessage);
      return res.status(201).json(newDirectMessage);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  }
}
