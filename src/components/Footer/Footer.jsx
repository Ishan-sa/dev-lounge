import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="flex justify-between px-8 items-center bg-gray-50 text-gray-700 font-semibold  bottom-0 z-10 w-full py-2 fixed">
        <p>© 2023</p>
        <div className="flex items-center">
          <p className="font-medium">
            Made with <span className="text-red-500">❤️</span> by Ishan.
          </p>
          <p>
            <Link href="https://github.com/Ishan-sa">
              <AiFillGithub className="inline-block ml-2 text-3xl text-gray-900 hover:text-gray-700 duration-150" />
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
