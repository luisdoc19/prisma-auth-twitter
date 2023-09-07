import { CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PublicUsers } from "@prisma/client";

import noImage from "@/public/no-user-image-icon-23.jpg";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function UserHover({ user, id }: { user: PublicUsers; id: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/${user.user_name}`}>
          <Image
            src={user.image || noImage}
            alt={user.id || user.user_name || ""}
            width={900}
            height={900}
            className="w-[45px] rounded-full select-none outline-none cursor-pointer"
          />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 rounded-2xl  shadow-[0_0_8px_0_rgba(255,255,255,0.7)]">
        <div className="">
          <div className="flex flex-row w-full justify-between">
            <div>
              <Link href={`/${user.user_name}`}>
                <Image
                  alt={user.user_name || ""}
                  src={user.image || noImage}
                  width={1080}
                  height={1080}
                  className="w-[60px] rounded-full flex self-center cursor-pointer select-none"
                />
              </Link>
            </div>

            {id && user.id !== id ? (
              <button className="h-full px-5 py-[7px] cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-2xl outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-black border-white hover:border-[#fff] bg-[#fff] hover:bg-[#fff]/60 focus-visible:outline-[#155b3d] shadow-sm text-sm font-bold ">
                Seguir
              </button>
            ) : (
              <div className="w-[86px] h-[20]"></div>
            )}
          </div>
          <div className="flex flex-col">
            <Link href={`/${user.user_name}`}>
              <span className="text-white font-bold block text-xl cursor-pointer hover:underline">
                {user.name}
              </span>
            </Link>
            <Link href={`/${user.user_name}`}>
              <span className="text-gray-400 font-light block text-sm cursor-pointer">
                @{user.user_name}
              </span>
            </Link>
          </div>
          <div className="flex flex-row gap-2 mt-2 text-gray-400 font-light  text-sm">
            <span className="flex flex-row gap-1 cursor-pointer hover:underline">
              <strong className="text-white font-bold block text-md">0</strong>
              Siguiendo
            </span>
            <span className="ml-2 flex flex-row gap-1 cursor-pointer hover:underline">
              <strong className="text-white font-bold block text-md">12</strong>
              Seguidores
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
