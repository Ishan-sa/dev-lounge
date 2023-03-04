import Card1 from "@/components/Card/Card";
import Hero from "@/components/Hero/Hero";
import Posts from "@/components/Posts/Posts";
import Head from "next/head";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import { prisma } from "../../server/db/client";
import { useState, useEffect } from "react";

// import SyntaxHighlighter from "react-syntax-highlighter";

export default function Home() {
  const sampleCode = [
    `export default function (context) {
  const { store, redirect } = context
  if (!store.state.authUser) {
    return redirect('/login')
  }
}`,
  ];

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
          {/* <Posts
            cardsData={newBlogCardData.map((card, index) => {
              return (
                <>
                  <Card1
                    key={index}
                    topHeader={card.topHeader}
                    title={card.title}
                  />
                </>
              );
            })}
          /> */}
          {/* {newBlogCardData.map((card, index) => {
            return (
              <Card1
                key={index}
                topHeader={card.topHeader}
                title={card.title}
              />
            );
          })} */}
          <Posts />
        </div>
      </main>
    </>
  );
}

// export async function getServersideProps() {
//   const blogCardData = await prisma.blogCard.findMany();
//   return {
//     props: {
//       cards: JSON.parse(JSON.stringify(blogCardData)),
//     },
//   };
// }
