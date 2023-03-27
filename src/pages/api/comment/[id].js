export default async function handler() {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json(post);
      break;
  }
}
