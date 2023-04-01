import { prisma } from "../../../../server/db/client";
import { authOptions } from "../auth/[...nextauth].js";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  // get individual user by id

  if (session) {
    const { id } = req.query;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } else {
    res.status(401).end("Unauthorized");
  }
}
