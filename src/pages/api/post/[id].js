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

    case "DELETE":
      const deletedPost = await prisma.post.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json(deletedPost);
      break;

    case "PUT":
      const { topHeader, title } = req.body;
      const updatedPost = await prisma.post.update({
        where: {
          id: parseInt(id),
        },
        data: {
          topHeader,
          title,
        },
      });
      res.status(200).json(updatedPost);

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
