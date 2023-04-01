import { prisma } from "../../../../server/db/client";
import { authOptions } from "../auth/[...nextauth].js";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  // get all users

  if (session) {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } else {
    res.status(401).end("Unauthorized");
  }
}
