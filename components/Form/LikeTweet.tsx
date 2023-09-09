import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import { Like, Posts, PublicUsers } from "@prisma/client";
import { Heart } from "lucide-react";
import { Session, User } from "next-auth";
import { useSocket } from "../providers/socketProvider";
import { useRouter } from "next/navigation";

type PostsWithUser = Posts & {
  user: PublicUsers;
  like: Like[];
  replies: Posts[] | [];
  like_length: number;
  user_liked: boolean;
};

type SessionWithId = Session & {
  user: {
    id: string;
  };
};
const LikeTweet = ({
  post,
  addOptimisticPost,
}: {
  post: PostsWithUser;
  addOptimisticPost: (newTweet: PostsWithUser) => void;
}) => {
  const { data } = useSession();
  const session: SessionWithId | null | any = data;
  const router = useRouter();
  const likeKey = `notification:${post?.id}`;
  const { socket } = useSocket();

  const handleLike = async () => {
    if (!session) return;
    if (!session?.user?.id) return;

    if (post?.user_liked) {
      addOptimisticPost({
        ...post,
        user_liked: false,
        like_length: post.like_length - 1,
      });
      const { data } = await axios.delete("/api/like", {
        data: {
          postId: post.id,
          id: session?.user?.id,
        },
      });
    } else {
      addOptimisticPost({
        ...post,
        user_liked: true,
        like_length: post?.like_length + 1,
      });
      const { data } = await axios.post("/api/socket/like", {
        postId: post?.id,
        id: session?.user?.id,
      });
      router.refresh();
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on(likeKey, (data: any) => {
      if (data.user_id !== session?.user?.id) {
        addOptimisticPost({
          ...post,
          like_length: post.like_length + 1,
        });
        router.refresh();
      }
    });
    return () => {
      socket.off(likeKey);
    };
  }, [addOptimisticPost, post, socket, session?.user?.id, likeKey, router]);

  return (
    <div className="flex flex-row items-center hover:text-red-600">
      <div
        className="hover:bg-red-600/10 rounded-full cursor-pointer p-2"
        onClick={handleLike}
      >
        {post.user_liked ? (
          <Heart size={18} fill="red" color="red" />
        ) : (
          <Heart size={18} />
        )}
      </div>
      <span className="ml-2">{post.like_length}</span>
    </div>
  );
};

export default LikeTweet;
