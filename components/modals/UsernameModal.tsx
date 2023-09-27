import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Session, User } from "next-auth";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

const schema = z.object({
  username: z.string().min(4).max(50),
});

type SessionWithId = {
  data:
    | (Session & {
        user: User & {
          id: string;
        };
      })
    | null;
};

const UsernameModal = () => {
  const session: SessionWithId = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState({
    message: "",
    type: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (form) => {
    setLoading(true);
    try {
      await axios.patch("/api/user", {
        username: form.username,
        id: session?.data?.user?.id,
      });
      toast.success("Username updated!");
      setOpen(false);
      reset();
      router.refresh();
    } catch (error) {
      //@ts-ignore
      if (error.response.data) {
        setLoading(false);
        //@ts-ignore
        setError(error.response.data);
      }
    }
  });

  useEffect(() => {
    const getUsername = async () => {
      const { data } = await axios.post("/api/user", {
        id: session?.data?.user?.id,
      });

      if (!data.username || data.username === "") {
        setOpen(true);
      }
    };

    if (session?.data?.user?.id) getUsername();
  }, [session]);

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please add an username to your account</DialogTitle>
          <DialogDescription>
            This action will help other users to find you
          </DialogDescription>
        </DialogHeader>
        <Toaster richColors theme="dark" position="top-right" />
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              placeholder="@username"
              className={`peer/input outline-none block box-border w-full rounded-md shadow-sm transition-all text-[#ededed] border text-sm px-4 py-2 mt-2 ${
                errors.username || error.type
                  ? "border-red-700 focus:ring-red-500 bg-red-300/10 placeholder:text-red-600"
                  : " bg-[#222222]  focus:ring-2 focus:border-[#494949] focus:ring-[#272727] placeholder-[#505050]  border-[#3e3e3e]"
              }`}
              {...register("username", {
                required: true,
                minLength: 4,
                onChange() {
                  if (error.type) {
                    setError({
                      message: "",
                      type: "",
                    });
                  }
                },
              })}
            />
            <div className="text-sm">
              {errors.username?.type && (
                <span className="text-red-500 text-smt transition-all font-bold mt-1">
                  {errors.username.message?.toString()}
                </span>
              )}
              {error.type && (
                <span className="text-red-500 text-smt transition-all font-bold mt-1">
                  {error.message}
                </span>
              )}
            </div>
            <DialogFooter>
              <div
                className={`relative cursor-pointer flex space-x-2 text-center font-regular rounded-md outline-none transition-all outline-0 focus-visible:outline-4 justify-end focus-visible:outline-offset-1 borde bg-[#4a99e9] hover:bg-[#4a99e9]/90 text-white border border-[#7785df] focus-visible:outline-[#a1ceba] text-sm text-bold shadow-sm w-max  leading-4 px-2 py-3 mt-2 ${
                  loading
                    ? "opacity-50 cursor-not-allowed pointer-events-none bg-[#10472f]/90"
                    : "opacity-100"
                }"`}
              >
                <button className="flex flex-row" type="submit">
                  {loading && <span className="loading w-[14px]"></span>}
                  Update account
                </button>
              </div>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UsernameModal;
