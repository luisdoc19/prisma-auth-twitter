import React from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import { Posts, PublicUsers } from "@prisma/client";
import { Heart } from "lucide-react";

type PostsWIthUser = Posts & {
  user: PublicUsers | null | undefined;
};

const LikeTweet = ({
  post,
  addOptimisticPost,
}: {
  post: PostsWIthUser;
  addOptimisticPost: (newTweet: PostsWIthUser) => void;
}) => {
  const { data: session } = useSession();

  const handleLike = async () => {
    if (!session) return;

    if (!session?.user?.id) return;
    const { data } = await axios.post("/api/like", {
      postId: post.id,
      id: session?.user?.id,
    });
  };

  return (
    <div className="flex flex-row items-center hover:text-red-600">
      <div
        className="hover:bg-red-600/10 rounded-full cursor-pointer p-2"
        onClick={handleLike}
      >
        <Heart size={18} />
      </div>
      <span className="ml-2">{post.like_length}</span>
    </div>
  );
};

export default LikeTweet;
