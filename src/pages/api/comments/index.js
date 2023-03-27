import { prisma } from "../../../../server/db/client";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { postId, title, content } = req.body;

  const comment = await prisma.comment.create({
    data: {
      title,
      content,
      author: {
        connect: {
          email: session.user.email,
        },
      },
      post: {
        connect: {
          id: parseInt(postId),
        },
      },
    },
  });
  res.status(200).json(comment);
}
