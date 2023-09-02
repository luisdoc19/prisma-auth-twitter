import { Session } from "next-auth";

declare global {
  type SessionWithExp = Session & { exp: number };
}
