import { prisma } from "../../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth].js";

export default async function handler(req, res) {
  const { method, query } = req;
  const session = await getServerSession(req, res, authOptions);

  switch (method) {
    case "GET":
      // if (session) {
      const posts = query.slug
        ? await prisma.post.findUnique({
            where: {
              slug: query.slug,
            },
            include: {
              comments: {
                include: {
                  user: true,
                },
              },
            },
          })
        : await prisma.post.findMany({
            orderBy: {
              createdAt: "desc",
            },
          });
      res.status(200).json(posts);
      // } else {
      res.status(401).end("Unauthorized");
      // }
      break;

    case "POST":
      // get the topHeader and title from the request body
      const { topHeader, title } = req.body;
      //   use prisma to create a new post using that data
      const newPost = await prisma.post.create({
        data: {
          topHeader,
          title,
          slug: title.toLowerCase().replace(/ /g, "-"),
          image: "/blog-cards/useeffect-1.png",
          type: "article",
        },
      });
      //   send the post back to the client
      res.status(201).json(newPost);
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
