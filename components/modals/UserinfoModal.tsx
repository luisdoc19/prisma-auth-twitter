"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Toaster } from "sonner";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useModal } from "@/hooks/useModal";
import { Cross2Icon } from "@radix-ui/react-icons";

import noUser from "@/public/no-user-image-icon-23.jpg";
import noBackground from "@/public/no-image.png";
import Image from "next/image";

const UserinfoModal = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    bio: "",
    image: "",
    id: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { type, open, id, onClose } = useModal();

  const onSubmit = handleSubmit(async (form) => {
    console.log(onSubmit);
  });

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get(`/api/user?userId=${id}`);
      setUser(data.user);
    };
    if (id === null) return onClose();
    getUserInfo();
  }, [id, onClose]);

  if (id === undefined) return null;
  return (
    <Dialog open={type === "change-info" && open} onOpenChange={handleClose}>
      <DialogContent className="p-0">
        <DialogHeader className="flex flex-row gap-2 px-4 py-2 sticky top-0">
          <button className="rounded-sm opacity-70 ring-offset-white transition-opacity mt-[6px] ">
            <Cross2Icon
              className="h-5 w-5 outline-none focus:outline-none active:outline-none"
              onClick={() => onClose()}
            />
            <span className="sr-only" onClick={handleClose}>
              Close
            </span>
          </button>
          <div className="flex flex-row justify-between items-center w-full mt-0">
            <h3 className="text-md font-bold">Edit profile</h3>
            <div
              className={`relative cursor-pointer flex space-x-2 text-center font-regular rounded-2xl outline-none transition-all outline-0 focus-visible:outline-4 justify-end focus-visible:outline-offset-1 borde text-black bg-white hover:opacity-90  focus-visible:outline-[#a1ceba] text-sm text-bold shadow-sm w-max  leading-4 px-3 py-2 font-bold ${
                loading
                  ? "opacity-50 cursor-not-allowed pointer-events-none bg-white/90"
                  : "opacity-100"
              }"`}
            >
              <button className="flex flex-row" type="submit">
                {loading && <span className="loading w-[14px]"></span>}
                Save
              </button>
            </div>
          </div>
        </DialogHeader>
        <Toaster richColors theme="dark" position="top-right" />
        <form onSubmit={onSubmit}>
          <div>
            <Image src={noBackground} alt="" className="w-max h-auto" />
          </div>
          <div className="relative top-[-60px] h-max ml-2">
            <Image
              src={user.image || noUser}
              alt=""
              width={900}
              height={900}
              className="w-[120px] rounded-full border-4 border-black"
            />
          </div>
          <div className="px-4 pb-2 top-0 relative">
            <div>
              <label className="mt-2 text-zinc-500 text-sm font-bold">
                Name
              </label>
              <input
                type="text"
                placeholder="Fullname"
                value={user?.name}
                className={`peer/input outline-none block box-border w-full rounded-md shadow-sm transition-all text-[#ededed] border text-sm px-4 py-2 mt-1 ${
                  errors.username
                    ? "border-red-700 focus:ring-red-500 bg-red-300/10 placeholder:text-red-600"
                    : " bg-[#222222]  focus:ring-2 focus:border-[#494949] focus:ring-[#272727] placeholder-[#505050]  border-[#3e3e3e]"
                }`}
                {...register("name", {
                  required: true,
                  minLength: 4,
                  onChange() {},
                })}
              />
            </div>
            <div>
              <label className="mt-2 text-zinc-500 text-sm font-bold">
                Bio
              </label>
              <input
                type="text"
                placeholder="Bio"
                value={user?.bio}
                className={`peer/input outline-none block box-border w-full rounded-md shadow-sm transition-all text-[#ededed] border text-sm px-4 py-2 mt-1 ${
                  errors.bio
                    ? "border-red-700 focus:ring-red-500 bg-red-300/10 placeholder:text-red-600"
                    : " bg-[#222222]  focus:ring-2 focus:border-[#494949] focus:ring-[#272727] placeholder-[#505050]  border-[#3e3e3e]"
                }`}
                {...register("bio", {
                  required: true,
                  minLength: 4,
                  onChange() {},
                })}
              />
            </div>
            <div>
              <label className="mt-2 text-zinc-500 text-sm font-bold">
                Location
              </label>
              <input
                type="text"
                placeholder="Location"
                className={`peer/input outline-none block box-border w-full rounded-md shadow-sm transition-all text-[#ededed] border text-sm px-4 py-2 mt-1 ${
                  errors.bio
                    ? "border-red-700 focus:ring-red-500 bg-red-300/10 placeholder:text-red-600"
                    : " bg-[#222222]  focus:ring-2 focus:border-[#494949] focus:ring-[#272727] placeholder-[#505050]  border-[#3e3e3e]"
                }`}
                {...register("location", {
                  required: true,
                  minLength: 4,
                  onChange() {},
                })}
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserinfoModal;
