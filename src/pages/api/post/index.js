import { prisma } from "../../../../server/db/client";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json(posts);
      break;

    case "POST":
      // get the topHeader and title from the request body
      const { topHeader, title } = req.body;
      //   use prisma to create a new post using that data
      let slug = title.toLowerCase().replace(/ /g, "-");
      slug =
        slug.endsWith("-") || slug.endsWith("?") ? slug.slice(0, -1) : slug;
      const newPost = await prisma.post.create({
        data: {
          topHeader,
          title,
          slug: slug,
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
