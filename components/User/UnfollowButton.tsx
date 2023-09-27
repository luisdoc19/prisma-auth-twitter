"use client";
import { useModal } from "@/hooks/useModal";
import React, { useState } from "react";

const UnfollowButton = ({ id, userId }: { id: string; userId: PublicUser }) => {
  const [active, setActive] = useState(false);
  const { onOpen } = useModal();
  return (
    <button
      className={`text-white font-bold text-sm px-4 py-1 rounded-2xl border border-zinc-600 ${
        active
          ? "border-[#67070f]/50 text-[#f4212e] bg-[#67070f]/30"
          : "bg-transparent"
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
