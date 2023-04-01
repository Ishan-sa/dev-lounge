import { prisma } from "../../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth].js";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  const session = await getServerSession(req, res, authOptions);

  switch (method) {
    case "GET":
      // if (session) {
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json(post);
      // } else {
      res.status(401).end("Unauthorized");
      // }
      break;

    case "DELETE":
      if (session) {
        const deletedPost = await prisma.post.delete({
          where: {
            id: parseInt(id),
          },
        });
        res.status(200).json(deletedPost);
      } else {
        res.status(401).end("Unauthorized");
      }
      break;

    case "PUT":
      if (session) {
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
      } else {
        res.status(401).end("Unauthorized");
      }

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
