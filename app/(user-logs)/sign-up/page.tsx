import FormSignUp from "@/components/UserSessionLog/FormSignUp";
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session: SessionWithExp | null = await getServerSession(authOptions);

  if (session?.user) redirect("/");

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2">
        <h1 className="text-[#ededed] text-2xl lg:text-2xl mt-8 mb-2">
          Get started
        </h1>
        <h2 className="text-sm text-scale-1100 text-[#bbbbbb]">
          Create a new account
        </h2>
      </div>
      <FormSignUp />
      <div className="my-8 self-center text-sm">
        <span className="text-[#7e7e7e]">Have an account? </span>
        <Link
          href="/sign-in"
          className="underline text-[#ededed] hover:text-[#bbb] transition"
        >
          Sign In Now
        </Link>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default page;
