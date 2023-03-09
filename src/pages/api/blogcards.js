import { prisma } from "../../../server/db/client";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      // get the topHeader and title from the request body
      const { topHeader, title } = req.body;
      //   use prisma to create a new blog card using that data
      const newBlogCard = await prisma.blogCard.create({
        data: {
          topHeader,
          title,
        },
      });
      //   send the blogcard back to the client
      res.status(201).json(newBlogCard);
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
