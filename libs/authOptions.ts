import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
// @ts-ignore
import bcrypt from "bcryptjs";
import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user?.password as string
        );

        if (!passwordMatch) return null;

        if (user && passwordMatch) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            user_name: user.user_name,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({
      session,
      token,
      user,
    }: {
      session: any;
      token: JWT;
      user: AdapterUser;
    }) => {
      const userExits = await prisma.publicUsers.findUnique({
        where: {
          id: token.id as string,
        },
      });

      if (!userExits) {
        await prisma.publicUsers.create({
          data: {
            id: token.id as string,
            name: session.user?.name as string,
            email: session.user?.email as string,
            image: session.user?.image as string,
            user_name: token?.user_name as string,
          },
        });
      }

      return {
        ...session,
        exp: token.exp,
        user: {
          id: token.id,
          ...session.user,
          user_name: token.user_name,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          user_name: u.user_name,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};
