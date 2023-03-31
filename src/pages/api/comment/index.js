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
      if (session) {
        const commentId = Number.parseInt(query.id);
        const userId = session.user.id;

        const comment = await prisma.comment.findUnique({
          where: {
            id: commentId,
          },
          select: {
            id: true,
            userId: true,
          },
        });

        if (!comment) {
          res.status(404).end(`Comment ${commentId} not found`);
          return;
        }

        if (comment.userId !== userId) {
          res.status(403).end("Forbidden");
          return;
        }

        const deletedComment = await prisma.comment.delete({
          where: {
            id: commentId,
          },
        });

        res.status(200).json(deletedComment);
      } else {
        res.status(401).end("Unauthorized");
      }
      break;

    case "PUT":
      if (session) {
        const { content } = req.body;
        const commentId = Number.parseInt(query.id);
        const userId = session.user.id;

        const comment = await prisma.comment.findUnique({
          where: {
            id: commentId,
          },
          select: {
            id: true,
            userId: true,
          },
        });

        if (!comment) {
          res.status(404).end(`Comment ${commentId} not found`);
          return;
        }

        if (comment.userId !== userId) {
          res.status(403).end("Forbidden");
          return;
        }

        const updatedComment = await prisma.comment.update({
          where: {
            id: commentId,
          },
          data: {
            content,
          },
          include: {
            post: true,
            user: true,
          },
        });

        res.status(200).json(updatedComment);
      } else {
        res.status(401).end("Unauthorized");
      }
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
