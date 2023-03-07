import Card1 from "@/components/Card/Card";
import Hero from "@/components/Hero/Hero";
import Posts from "@/components/Posts/Posts";
import Head from "next/head";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { prisma } from "../../server/db/client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// import SyntaxHighlighter from "react-syntax-highlighter";

export default function Home({ cards }) {
  console.log(cards);
  const sampleCode = [
    `export default function (context) {
  const { store, redirect } = context
  if (!store.state.authUser) {
    return redirect('/login')
  }
}`,
  ];
  const imageArr = ["/blog-cards/useeffect-1.png", "/blog-cards/next-cra.png"];

  // const [newBlogCardData, setNewBlogCardData] = useState(cards);

  // useEffect(() => {
  //   setNewBlogCardData(cards);
  // }, [newBlogCardData]);

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
            cardData={cards.map((card, index) => {
              return (
                <Link href={`/articles/${card.id}`}>
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
