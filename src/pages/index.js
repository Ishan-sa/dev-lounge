import Card1 from "@/components/Card/Card";
import Hero from "@/components/Hero/Hero";
import Posts from "@/components/Posts/Posts";
import Head from "next/head";
import { prisma } from "../../server/db/client";
import { useRouter } from "next/router";
import KeepChangingThis from "@/components/KeepChangingThis/KeepChangingThis";
import TechStack from "@/components/TechStack/TechStack";

export default function Home({ posts }) {
  const router = useRouter();

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
        <div className="h-full">
          <TechStack />
        </div>
        {/* <div className="h-screen">
          <KeepChangingThis />
        </div> */}
        <div className="flex flex-col mt-[14rem] mb-[6rem]">
          <Posts
            title="Coding Chronicles: Tales from the Keyboard"
            subtitle="LATEST FROM THE BLOG"
            cardData={posts.map((post, index) => {
              return (
                <Card1
                  onClick={() => router.push(`/articles/${post.slug}`)}
                  key={index}
                  topHeader={post.topHeader}
                  title={post.title}
                  image={post.image}
                />
              );
            })}
          />
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const post = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(post)),
    },
  };
}
