import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import Card1 from "../Card/Card";

import CommentsSection from "../CommentsSection/CommentsSection";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Layout({ children }) {
  const router = useRouter();
  const pathParams = router.pathname;
  const slug = pathParams.split("/").pop();

  const { data: post } = useSWR(`/api/post?slug=${slug}`, fetcher);

  const { data: posts } = useSWR(`/api/post`, fetcher);

  return (
    <div className="flex flex-col px-8 max-w-[800px] m-auto">
      {children}
      {post && (
        <CommentsSection
          post={post}
          onMutate={() => mutate(`/api/post?slug=${slug}`)}
        />
      )}

      <div className="flex">
        <h1 className="text-2xl font-semibold">Explore other articles</h1>
      </div>
      <div className="flex flex-col gap-2 my-4">
        <div className="flex flex-col gap-2 lg:flex-row">
          {posts &&
            posts
              .slice(0, 2)
              .map((post) => (
                <Card1
                  key={post.id}
                  topHeader={post.topHeader}
                  title={post.title}
                  image={post.image}
                  onClick={() => router.push(`/articles/${post.slug}`)}
                />
              ))}
        </div>
        <div className="flex flex-col gap-2 lg:flex-row">
          {posts &&
            posts
              .slice(2, 4)
              .map((post) => (
                <Card1
                  key={post.id}
                  topHeader={post.topHeader}
                  title={post.title}
                  image={post.image}
                  onClick={() => router.push(`/articles/${post.slug}`)}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
