import useSWR from "swr";
import { useRouter } from "next/router";

import CommentsSection from "../CommentsSection/CommentsSection";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Layout({ children }) {
  const router = useRouter();
  const pathParams = router.pathname;
  const slug = pathParams.split("/").pop();

  const { data: post } = useSWR(`/api/post?slug=${slug}`, fetcher);

  return (
    <div className="flex flex-col px-8 max-w-[800px] m-auto">
      {children}
      {post && <CommentsSection post={post} />}
    </div>
  );
}
