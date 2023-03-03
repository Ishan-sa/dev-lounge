import Hero from "@/components/Hero/Hero";
import Posts from "@/components/Posts/Posts";
import Head from "next/head";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
          <Posts />
        </div>
      </main>
    </>
  );
}

// "width: 799px; height: 690px; border:0; transform: scale(1); overflow:hidden;"
