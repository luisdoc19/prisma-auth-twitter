"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";

import Google from "../ProvidersButtons/Google";
import Github from "../ProvidersButtons/Github";
import axios from "axios";

const schema = zod.object({
  fullname: zod.string().min(4).max(50),
  username: zod.string().min(4).max(50),
  email: zod.string().email(),
  password: zod.string().min(6).max(50),
});

interface FormSignInType {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

const FormSignIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSignInType>({ resolver: zodResolver(schema as any) });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    message: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (form) => {
    setLoading(true);

    try {
      const { data } = await axios.post("/api/auth/signup", form);
      if (data.success) {
        window.location.href = "/sign-in";
      }
    } catch (error) {
      //@ts-ignore
      if (error.response.data) {
        //@ts-ignore
        setError(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <div className="flex flex-col gap-2 mb-2">
        <Google />
        <Github />
      </div>
      <div className="flex flex-row items-center border-scale">
        <div className="bg-[#3e3e3e] w-[160px] h-[1px] lg:w-[180px]"></div>
        <span className="px-2 text-sm text-[#ededed]">or</span>
        <div className="bg-[#3e3e3e] w-[160px] h-[1px] lg:w-[180px]"></div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="text-xs text-zinc-300 flex flex-col">
          <input
            type="text"
            placeholder="Fullname"
            className={`peer/input outline-none block box-border w-full rounded-md shadow-sm transition-all text-[#ededed] border text-sm px-4 py-2 mt-2 ${
              errors.fullname
                ? "border-red-700 focus:ring-red-500 bg-red-300/10 placeholder:text-red-600"
                : " bg-[#222222]  focus:ring-2 focus:border-[#494949] focus:ring-[#272727] placeholder-[#505050]  border-[#3e3e3e]"
            }`}
            {...register("fullname", { required: true, minLength: 4 })}
          />
          <div className="">
            {errors.fullname?.type && (
              <span className="text-red-500 text-smt transition-all font-bold mt-1">
                {errors.fullname.message}
              </span>
            )}
          </div>
        </div>
        <div className="text-xs text-zinc-300 flex flex-col">
          <input
            type="text"
            placeholder="@username"
            className={`peer/input outline-none block box-border w-full rounded-md shadow-sm transition-all text-[#ededed] border text-sm px-4 py-2 mt-2 ${
              errors.username || error.type === "username"
                ? "border-red-700 focus:ring-red-500 bg-red-300/10 placeholder:text-red-600"
                : " bg-[#222222]  focus:ring-2 focus:border-[#494949] focus:ring-[#272727] placeholder-[#505050]  border-[#3e3e3e]"
            }`}
            {...register("username", {
              required: true,
              minLength: 4,
              onChange() {
                if (error.type === "username") {
                  setError({
                    message: "",
                    type: "",
                  });
                }
              },
            })}
          />

          <div className="">
            {errors.username?.type && (
              <span className="text-red-500 text-smt transition-all font-bold mt-1">
                {errors.username.message}
              </span>
            )}
            {error.type === "username" && (
              <span className="text-red-500 text-smt transition-all font-bold mt-1">
                {error.message}
              </span>
            )}
          </div>
        </div>
        <div className="text-xs text-zinc-300 flex flex-col">
          <input
            type="email"
            placeholder="user@user.com"
            className={`peer/input outline-none block box-border w-full rounded-md shadow-sm transition-all text-[#ededed] border text-sm px-4 py-2 mt-2 ${
              errors.email || error.type === "email"
                ? "border-red-700 focus:ring-red-500 bg-red-300/10 placeholder:text-red-600"
                : " bg-[#222222]  focus:ring-2 focus:border-[#494949] focus:ring-[#272727] placeholder-[#505050]  border-[#3e3e3e]"
            }`}
            {...register("email", {
              required: true,
              minLength: 5,
              onChange() {
                if (error.type === "email") {
                  setError({
                    message: "",
                    type: "",
                  });
                }
              },
            })}
          />
          <div className="">
            {errors.email?.type && (
              <span className="text-red-500 text-smt transition-all font-bold mt-1">
                {errors.email.message}
              </span>
            )}

            {error.type === "email" && (
              <span className="text-red-500 text-smt transition-all font-bold mt-1">
                {error.message}
              </span>
            )}
          </div>
        </div>
        <div className="text-xs text-zinc-300 flex flex-col relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`peer/input outline-none block box-border w-full rounded-md shadow-sm transition-all text-[#ededed] border text-sm px-4 py-2 mt-2 ${
              errors.password
                ? "border-red-700 focus:ring-red-500 bg-red-300/10 placeholder:text-red-600"
                : " bg-[#222222]  focus:ring-2 focus:border-[#494949] focus:ring-[#272727] placeholder-[#505050]  border-[#3e3e3e]"
            }`}
            {...register("password", { required: true, minLength: 6 })}
          />
          <div className="">
            {errors.password?.type && (
              <span className="text-red-500 text-smt transition-all font-bold mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          {!errors.password && (
            <div className="absolute inset-y-0 right-2 top-2 pl-3 pr-1 flex space-x-1 items-center">
              <button
                type="button"
                className="bg-zinc-700 px-1 py-1 rounded border border-[#494949] placeholder-[#505050]  focus:ring-2 focus:border-[#494949] focus:ring-[#272727]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-eye"
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
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-eye-off"
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
                    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path>
                    <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path>
                    <path d="M3 3l18 18"></path>
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
        <div
          className={`relative justify-center cursor-pointer flex mx-auto items-center space-x-2 text-center font-regular rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 borde bg-[#4a99e9] hover:bg-[#4a99e9]/90 text-white border border-[#7785df] focus-visible:outline-[#a1ceba] text-sm text-bold shadow-sm w-full  leading-4 px-2 py-3 mt-4 ${
            loading
              ? "opacity-50 cursor-not-allowed pointer-events-none bg-[#10472f]/90"
              : "opacity-100"
          }"`}
        >
          <button className="flex flex-row" type="submit">
            {loading && <span className="loading w-[14px]"></span>}
            Create account
          </button>
        </div>
      </form>
    </>
  );
};

export default FormSignIn;
