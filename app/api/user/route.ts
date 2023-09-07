import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const requestUrl = new URL(req.url);
  const userId = requestUrl.searchParams.get("userId");

  if (!userId) return NextResponse.json({ message: "User not found" });

  const user = await prisma.publicUsers.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" });
  }

  return NextResponse.json({ user });
}

export async function POST(req: Request, res: Response) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      { message: "Missing required fields", type: "error" },
      { status: 400 }
    );
  }
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return NextResponse.json({ username: user?.user_name });
}

export async function PATCH(req: Request, res: Response) {
  const { id, username } = await req.json();

  if (!id || !username) {
    return NextResponse.json(
      { message: "Missing required fields", type: "error" },
      { status: 400 }
    );
  }
  const usernameExists = await prisma.user.findUnique({
    where: { user_name: username },
  });

  if (usernameExists) {
    return NextResponse.json(
      { message: "Username already exists", type: "error" },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: { id },
    data: { user_name: username },
  });

  await prisma.publicUsers.update({
    where: { id },
    data: { user_name: username },
  });

  return NextResponse.json({ user });
}
