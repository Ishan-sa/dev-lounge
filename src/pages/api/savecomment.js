import { prisma } from "../../../server/db/client";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      // get the topHeader and title from the request body
      const { comment, blogId } = req.body;
      //   use prisma to create a new blog card using that data
      const newComment = await prisma.comment.create({
        data: {
          comment,
          blogId,
        },
      });
      //   send the blogcard back to the client
      res.status(201).json(newComment);
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
