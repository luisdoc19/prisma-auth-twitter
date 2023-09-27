import { useModal } from "@/hooks/useModal";
import React from "react";

const UnfollowModal = () => {
  const { open, onClose, user } = useModal();
  return (
    open && (
      <div
        className="out w-full h-full fixed bg-[#5b7083]/40 z-50 grid place-items-center"
        onClick={(e) => {
          if (e.currentTarget.classList[0] === "out") onClose();
        }}
      >
        <div
          className="in bg-black text-white p-8 w-[320px] z-60 rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-bold">Unfollow @{user?.user_name}?</h3>
          <p className="text-zinc-500 text-[15px] leading-5">
            Their posts will no longer show up in your For You timeline. You can
            still view their profile, unless their posts are protected.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <button className="w-full bg-white rounded-3xl font-bold text-black py-2 cursor-pointer">
              Unfollow
            </button>
            <button
              className="w-full bg-transparent rounded-3xl font-bold py-2 border border-zinc-600 cursor-pointer"
              onClick={() => onClose()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UnfollowModal;
