import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

export async function getStaticPaths() {
  const options = {
    encoding: "utf-8",
  };
  const posts = fs.readdirSync("articles", options);
  const paths = posts.map((post) => ({
    params: {
      slug: post.replace(/\.mdx$/, ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await import(`../articles/${params.slug}.mdx`);
  const { content, data } = matter(post.default);

  const mdxSource = await serialize(content, {
    // options
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
}

export default function Post({ source, frontMatter }) {
  return (
    <>
      <MDXRemote {...source} />
    </>
  );
}
