import { Session, User } from "next-auth";
import { DirectMessage, PublicUsers, Like, Posts } from "../models";
import { NextApiResponse } from "next";
import { Server as NetServer, Socket } from "http";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

declare global {
  type SessionWithExp = Session & {
    user: User & {
      id: string;
    };
    exp: number;
  };
  type directMessageSender = DirectMessage & {
    sender: PublicUsers;
  };
  type MessageWithUsers = Message & {
    directMessage: DirectMessage[];
    userOne: PublicUsers;
    userTwo: PublicUsers;
    user: PublicUsers | false;
  };
  type PostsWIthUser = Posts & {
    user: PublicUsers;
    like: Like[];
    like_length: number;
    user_liked: boolean;
  };
}
