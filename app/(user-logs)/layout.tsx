"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FormSignIn from "@/components/UserSessionLog/FormSignUp";
import TwitterLogo from "../../public/logo-twitter.png";

export default function LogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100vh]">
      <div className="container relative  h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 overflow-hidden">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white border-r border-zinc-800 lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-twitter-filled mr-2"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M14.058 3.41c-1.807 .767 -2.995 2.453 -3.056 4.38l-.002 .182l-.243 -.023c-2.392 -.269 -4.498 -1.512 -5.944 -3.531a1 1 0 0 0 -1.685 .092l-.097 .186l-.049 .099c-.719 1.485 -1.19 3.29 -1.017 5.203l.03 .273c.283 2.263 1.5 4.215 3.779 5.679l.173 .107l-.081 .043c-1.315 .663 -2.518 .952 -3.827 .9c-1.056 -.04 -1.446 1.372 -.518 1.878c3.598 1.961 7.461 2.566 10.792 1.6c4.06 -1.18 7.152 -4.223 8.335 -8.433l.127 -.495c.238 -.993 .372 -2.006 .401 -3.024l.003 -.332l.393 -.779l.44 -.862l.214 -.434l.118 -.247c.265 -.565 .456 -1.033 .574 -1.43l.014 -.056l.008 -.018c.22 -.593 -.166 -1.358 -.941 -1.358l-.122 .007a.997 .997 0 0 0 -.231 .057l-.086 .038a7.46 7.46 0 0 1 -.88 .36l-.356 .115l-.271 .08l-.772 .214c-1.336 -1.118 -3.144 -1.254 -5.012 -.554l-.211 .084z"
                strokeWidth="0"
                fill="currentColor"
              ></path>
            </svg>
            Twitter
          </div>
          <div className="relative z-20 mt-auto mx-auto">
            <Image src={TwitterLogo} width={500} height={500} alt="" />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-1">
              <p className="text-md">
                &ldquo;This is an app created with all love from @luisdoc19 on
                Github. Hope you enjoyed&rdquo;
              </p>
              <footer className="text-xs">Luis Oñate</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
