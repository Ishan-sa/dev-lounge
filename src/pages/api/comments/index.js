import { prisma } from "$db/client";

export default async function handler(req, res) {
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
      const { title, content, postid } = req.body;
      const newComment = await prisma.comment.create({
        data: {
          title,
          content,
          post: {
            connect: {
              id: postid,
            },
          },
        },
        include: {
          post: true,
        },
      });
      res.status(201).json(newComment);
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
