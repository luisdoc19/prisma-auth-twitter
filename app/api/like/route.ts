import { prisma } from "@/libs/prisma";
export async function POST(req: Request, res: Response) {
  const data = await req.json();
  await prisma.like.create({
    data: {
      user_id: data.id,
      post_id: data.postId,
    },
  });
  console.log(data);
}
