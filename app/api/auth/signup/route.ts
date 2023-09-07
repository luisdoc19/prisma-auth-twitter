import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
//@ts-ignore
import bcrypt from "bcryptjs";

export async function POST(req: Request, res: Response) {
  const { email, password, fullname, username } = await req.json();

  if (!email || !password || !fullname || !username) {
    return NextResponse.json(
      { error: "Please fill in all fields" },
      { status: 400 }
    );
  }

  const usernameExists = await prisma?.publicUsers.findUnique({
    where: {
      user_name: username,
    },
  });

  if (usernameExists) {
    return NextResponse.json(
      { message: "Username already exists", type: "username" },
      { status: 400 }
    );
  }

  const emailExists = await prisma?.user.findUnique({
    where: {
      email,
    },
  });

  if (emailExists) {
    return NextResponse.json(
      { message: "Email already exists", type: "email" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: fullname,
      user_name: username,
    },
  });

  return NextResponse.json({ success: true });
}
