"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RetrieveUser = () => {
  const router = useRouter();

  return <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />;
};

export default RetrieveUser;
