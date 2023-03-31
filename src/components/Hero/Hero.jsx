import Image from "next/image";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="flex flex-col items-center justify-center lg:flex-row py-6">
      <div className="flex flex-col justify-center items-left gap-4 pl-4">
        <div className="flex">
          <h1 className="text-6xl font-bold">
            Building the web, one line of code at a time.
          </h1>
        </div>
        <div className="flex">
          <h3 className="text-[#808080] italic">
            Follow me on my journey to becoming a better web developer, one line
            of code at a time.
          </h3>
        </div>
        <div className="flex gap-4">
          <Link href="https://github.com/Ishan-sa" target="_blank">
            <AiFillGithub className="text-4xl transition-all duration-150 hover:text-blue-500 " />
          </Link>

          <Link
            href="https://www.linkedin.com/in/ishan-sachdeva/"
            target="_blank"
          >
            <AiFillLinkedin className="text-4xl transition-all duration-150 hover:text-blue-500 " />
          </Link>
        </div>
      </div>
      <div className="flex mt-4 lg:mt-0">
        <Image
          src="/hero/code_1.png"
          height={1200}
          width={1200}
          alt="hero"
          quality={100}
        />
      </div>
    </main>
  );
}
