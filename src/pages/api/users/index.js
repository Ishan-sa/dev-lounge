import { prisma } from "../../../../server/db/client";

export default async function handler(req, res) {
  // get all users
  const users = await prisma.user.findMany();
  res.status(200).json(users);
}
