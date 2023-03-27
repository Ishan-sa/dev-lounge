import { prisma } from "../../../../server/db/client";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json(post);
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
