import React from "react";

import {
  BookmarkPlus,
  Image as ImageIcon,
  Link as LinkIcon,
  Mail,
  Share,
  User as UserImage,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PopoverShare = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Share size={18} className="flex items-center" />
      </PopoverTrigger>
      <PopoverContent className="bg-black p-0">
        <div>
          <div className="flex flex-row gap-4 cursor-pointer p-2 hover:bg-zinc-900">
            <LinkIcon />
            <span className="text-white font-semibold">Copy Link</span>
          </div>
          <div className="flex flex-row gap-4 cursor-pointer p-2 hover:bg-zinc-900">
            <Share />
            <span className="text-white font-semibold">Share post via...</span>
          </div>
          <div className="flex flex-row gap-4 cursor-pointer p-2 hover:bg-zinc-900">
            <Mail />
            <span className="text-white font-semibold">
              Send via Direct Message
            </span>
          </div>
          <div className="flex flex-row gap-4 cursor-pointer p-2 hover:bg-zinc-900">
            <BookmarkPlus />
            <span className="text-white font-semibold">Bookmark</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverShare;
