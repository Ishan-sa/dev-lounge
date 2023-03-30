import { prisma } from "../../../../server/db/client";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  // const session = await getServerSession();

  // console.log("session", session);

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
      // if (!session) {
      //   res.status(401).end("Unauthorized");
      //   return;
      // }

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

// how to upload new mdx files into a built and deployed project
// i.e: writing new pages for your blog and uploading those pages without having to rebuild and redeploy the entire app
