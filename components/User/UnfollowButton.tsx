"use client";
import { useModal } from "@/hooks/useModal";
import React, { useState } from "react";

const UnfollowButton = ({ id, userId }: { id: string; userId: PublicUser }) => {
  const [active, setActive] = useState(false);
  const { onOpen } = useModal();
  return (
    <button
      className={`font-bold text-base px-4 py-1 mr-2  shadow-sm hover:opacity-90 rounded-2xl border ${
        active
          ? "border-[#67070f]/50 text-[#f4212e] bg-[#67070f]/30"
          : "bg-transparent text-white border-zinc-600"
      }`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => onOpen("unfollow", id, userId)}
    >
      {active ? "Unfollow" : "Following"}
    </button>
  );
};

export default UnfollowButton;
