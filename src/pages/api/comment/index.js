import { getServerSession } from "next-auth";
import { prisma } from "../../../../server/db/client";
import { authOptions } from "../auth/[...nextauth].js";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  const { method, query } = req;

  switch (method) {
    case "GET":
      const comments = query.postid
        ? await prisma.comment.findMany({
            where: {
              postId: Number.parseInt(query.postid),
            },
            orderBy: {
              createdAt: "desc",
            },
          })
        : await prisma.comment.findMany({
            orderBy: {
              createdAt: "desc",
            },
          });
      res.status(200).json(comments);
      break;

    case "POST":
      if (session) {
        const { content, postId } = req.body;
        console.log("session", session);
        const userId = session.user.id;

        const newComment = await prisma.comment.create({
          data: {
            content,
            post: {
              connect: {
                id: postId,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
          include: {
            post: true,
            user: true,
          },
        });
        res.status(201).json(newComment);
      } else {
        res.status(401).end("Unauthorized");
      }
      break;

    case "DELETE":
      const deletedUser = await prisma.user.delete({
        where: {
          id: Number.parseInt(query.id),
        },
      });
      res.status(200).json(deletedUser);
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
