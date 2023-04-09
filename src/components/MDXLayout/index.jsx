import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import Card1 from "../Card/Card";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";

import CommentsSection from "../CommentsSection/CommentsSection";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Layout({ children }) {
  const router = useRouter();
  const pathParams = router.pathname;
  const slug = pathParams.split("/").pop();

  const { data: post } = useSWR(`/api/post?slug=${slug}`, fetcher);

  const { data: posts } = useSWR(`/api/post`, fetcher);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (posts) {
        setLoading(false);
      }
    }, 1000);
  }, [posts]);

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

      {loading ? (
        <div className="flex justify-center items-center">
          <Lottie
            animationData={require("../../../public/lottie-files/loading1.json")}
            loop={true}
            style={{ width: 100, height: 100 }}
          />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
