import { getServerSession } from "next-auth";
import { prisma } from "../../../../server/db/client";
import { authOptions } from "../auth/[...nextauth].js";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  const { method, query } = req;
  const commentId = query.id;

  switch (method) {
    case "GET":
      const comment = await prisma.comment.findUnique({
        where: {
          id: Number.parseInt(commentId),
        },
        include: {
          post: true,
          user: true,
        },
      });
      if (!comment) {
        res.status(404).end(`Comment with ID ${commentId} not found`);
      } else {
        res.status(200).json(comment);
      }
      break;

    case "PUT":
      if (session) {
        const { content } = req.body;
        const userId = session.user.id;

        const updatedComment = await prisma.comment.update({
          where: {
            id: Number.parseInt(commentId),
          },
          data: {
            content,
          },
          include: {
            post: true,
            user: true,
          },
        });
        if (!updatedComment) {
          res.status(404).end(`Comment with ID ${commentId} not found`);
        } else if (updatedComment.userId !== userId) {
          res
            .status(403)
            .end(
              `User with ID ${userId} is not authorized to update comment with ID ${commentId}`
            );
        } else {
          res.status(200).json(updatedComment);
        }
      } else {
        res.status(401).end("Unauthorized");
      }
      break;

    case "DELETE":
      const deletedComment = await prisma.comment.delete({
        where: {
          id: Number.parseInt(query.id),
        },
      });
      res.status(200).json(deletedComment);
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
