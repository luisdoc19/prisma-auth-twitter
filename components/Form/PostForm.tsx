"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ImageIcon } from "lucide-react";
import { Toaster, toast } from "sonner";

import axios from "axios";
import { useRouter } from "next/navigation";

const PostFormSchema = z.object({
  post: z
    .string()
    .min(1, { message: "Post cannot be empty" })
    .max(150, { message: "Post cannot be more than 150 characters" }),
});

type PostFormType = z.infer<typeof PostFormSchema>;

const PostForm = ({ session }: { session: string | undefined }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver<PostFormType | any>(PostFormSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    if (!session || !data.post) return;
    try {
      await axios.post("/api/post", { ...data, session });
    } catch (error) {
    } finally {
      toast.success("New post have been created!");
      reset();
      setLoading(false);
      router.refresh();
    }
  });

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <Toaster richColors theme="dark" position="top-right" />
      <div className="flex flex-col">
        <textarea
          placeholder="What's happening?!"
          rows={5}
          className={`resize-none outline-none  w-full px-4 pb-4 bg-black`}
          {...register("post", { required: true })}
        ></textarea>
        {errors.post?.type && (
          <span className="text-red-500 text-smt transition-all font-bold mt-1">
            {errors.post.message as string}
          </span>
        )}
        <div className="flex-row flex justify-between">
          <div className="flex items-center">
            <div>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger>
                    <ImageIcon color="#4fadff" className="cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Media</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="mr-4">
            <button
              disabled={loading}
              type="submit"
              className={`bg-primary text-white font-bold text-xl bg-sky-600 rounded-full px-5 py-2 flex flex-row items-center gap-2 ${
                loading && "opacity-50"
              }}`}
            >
              {loading && <span className="loading"></span>}
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
