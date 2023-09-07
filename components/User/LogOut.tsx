"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { LogOutIcon } from "lucide-react";

const LogOut = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        signOut();
        router.refresh();
      }}
      className="flex flex-row cursor-pointer"
    >
      <LogOutIcon className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </div>
  );
};

export default LogOut;
