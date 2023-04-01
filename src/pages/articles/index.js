import Posts from "@/components/Posts/Posts";
import Card1 from "@/components/Card/Card";
import Head from "next/head";
import { prisma } from "../../../server/db/client";
import { useRouter } from "next/router";

export default function articles({ posts }) {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-start p-4 h-full">
        <Posts
          title="Latest Articles"
          subtitle="WEB DEVELOPMENT SKILLS"
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
    </>
  );
}

export async function getServerSideProps() {
  const post = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(post)),
    },
  };
}
