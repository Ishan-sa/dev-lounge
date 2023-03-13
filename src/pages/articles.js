import Posts from "@/components/Posts/Posts";
import Card1 from "@/components/Card/Card";
import Head from "next/head";
import Link from "next/link";
import { prisma } from "../../server/db/client";

export default function articles({ cards }) {
  const imageArr = ["/blog-cards/useeffect-1.png", "/blog-cards/next-cra.png"];
  const cardLinks = [
    "/useeffect-react",
    "/nextjs-cra",
    "/tailwind-or-styledcomponents",
    "/react-vs-svelte",
  ];
  return (
    <>
      <div className="flex justify-start p-4">
        <Posts
          title="Latest Articles"
          subtitle="WEB DEVELOPMENT SKILLS"
          cardData={cards.map((card, index) => {
            return (
              <Link href={`/articles/${cardLinks[index]}`}>
                <Card1
                  key={index}
                  topHeader={card.topHeader}
                  title={card.title}
                  image={imageArr[index]}
                />
              </Link>
            );
          })}
        />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const blogCardData = await prisma.blogCard.findMany();
  return {
    props: {
      cards: JSON.parse(JSON.stringify(blogCardData)),
    },
  };
}
