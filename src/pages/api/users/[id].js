import { prisma } from "../../../../server/db/client";

export default async function handler(req, res) {
  // get individual user by id
  const { id } = req.query;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).json(user);
}
