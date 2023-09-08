"use client";
import { Like, Posts } from "@prisma/client";
import Image from "next/image";
import React from "react";

import noUser from "@/public/no-user-image-icon-23.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

type PostView = Posts & {
  user: {
    id: string;
    name: string;
    email: string | null;
    user_name: string | null;
    password: string | null;
    emailVerified: boolean | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  like: Like[];
};

type PublicUser =
  | {
      id: string;
      name: string;
      email: string | null;
      password: string | null;
      bio: string | null;
      user_name: string | null;
      emailVerified: boolean;
      image: string | null;
      createdAt: Date;
      updatedAt: Date;
    }
  | null
  | undefined;

const ReplyForm = ({
  post,
  id,
}: {
  post: PostView | undefined | null;
  id: PublicUser;
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (form) => {
    setLoading(true);
    const { data } = await axios.post("/api/reply", {
      replyText: form.reply,
      post_replied_id: post?.id,
      user_id: id?.id,
    });
    setLoading(false);
    reset();
    router.refresh();
  });

  return (
    <form
      className="px-4 py-4 flex flex-row border-b border-zinc-600"
      onSubmit={onSubmit}
    >
      <Image
        src={id?.image || noUser}
        alt={id?.id || ""}
        width={900}
        height={900}
        className="w-[40px] rounded-full h-[40px]"
      />
      <input
        type="text"
        className="bg-transparent outline-none w-full ml-2 text-white"
        placeholder="Post your reply!"
        {...register("reply", { required: true })}
      />
      <button
        className={`bg-primary text-white font-semibold text-base bg-sky-600 rounded-full px-3 py-1 flex flex-row items-center gap-2 ${
          loading && "opacity-50"
        }}`}
      >
        {loading && <span className="loader"></span>}
        Reply
      </button>
    </form>
  );
};

export default ReplyForm;
