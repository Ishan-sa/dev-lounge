import Card1 from "@/components/Card/Card";
import Hero from "@/components/Hero/Hero";
import Posts from "@/components/Posts/Posts";
import Head from "next/head";
import { prisma } from "../../server/db/client";
import Link from "next/link";

// import SyntaxHighlighter from "react-syntax-highlighter";

export default function Home({ cards }) {
  const imageArr = ["/blog-cards/useeffect-1.png", "/blog-cards/next-cra.png"];
  const cardLinks = [
    "/useeffect-react",
    "/nextjs-cra",
    "/tailwind-or-styledcomponents",
    "/react-vs-svelte",
  ];

  return (
    <>
      <Head>
        <title>Dev Lounge</title>
        <meta name="description" content="Blog | Ishan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-8 lg:px-4">
        <div className="h-screen">
          <Hero />
        </div>
        <div className="h-screen">
          <Posts
            title="Coding Chronicles: Tales from the Keyboard"
            subtitle="LATEST FROM THE BLOG"
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
      </main>
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
