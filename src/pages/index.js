import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dev Lounge</title>
        <meta name="description" content="Blog | Ishan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center px-8 lg:flex-row py-6">
        <div className="flex flex-col justify-center items-left gap-4">
          <div className="flex">
            <h1 className="text-6xl font-bold">
              Building the web, one line of code at a time.
            </h1>
          </div>
          <div className="flex">
            <h3 className="text-[#808080] italic">
              Follow me on my journey to becoming a better web developer, one
              line of code at a time.
            </h3>
          </div>
        </div>
        <div className="flex">
          <Image
            src="/hero/code_1.png"
            height={1300}
            width={1300}
            alt="hero"
            quality={100}
          />
        </div>
      </main>
    </>
  );
}

// "width: 799px; height: 690px; border:0; transform: scale(1); overflow:hidden;"
