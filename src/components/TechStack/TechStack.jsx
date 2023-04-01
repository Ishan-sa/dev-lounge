import Image from "next/image";

export default function TechStack() {
  const data1 = [
    "/techstack/html5.svg",
    "/techstack/css3.svg",
    "/techstack/javascript.svg",
    "/techstack/react.svg",
    "/techstack/nextjs.svg",
    "/techstack/node-js.svg",
    "/techstack/postman.svg",
  ];

  const data2 = [
    "/techstack/tailwind.svg",
    "/techstack/wordpress.svg",
    "/techstack/git.svg",
    "/techstack/firebase.svg",
    "/techstack/prisma.svg",
    "/techstack/framer-motion.svg",
  ];

  return (
    <div className=" flex flex-col gap-4">
      <h1 className="text-4xl font-bold">
        How I Craft Beautiful Digital Experiences
      </h1>
      <h3 className="text-xl">
        Unleashing the Power of Technology to Bring My Vision to Life
      </h3>
      <p className="text-base text-gray-900 ">
        Crafting beautiful digital experiences is both an art and a science. To
        bring my vision to life, I rely on a powerful tech stack that includes a
        wide range of tools and technologies. From JavaScript and React to
        Node.js, Tailwind, and WordPress, each tool plays an important role in
        helping me create stunning websites and applications.
      </p>

      <div className="flex flex-col justify-center items-center gap-8 mt-16">
        <div className="flex flex-wrap gap-14 justify-center items-center">
          {data1.map((item) => (
            <div className="flex flex-col items-center gap-2 bg-gray-100 p-4 rounded-xl shadow-md hover:scale-[1.1] duration-200">
              <Image src={item} width={100} height={100} />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-14 justify-center items-center">
          {data2.map((item) => (
            <div className="flex flex-col items-center gap-2 bg-gray-100 p-4 rounded-xl shadow-md hover:scale-[1.1] duration-200">
              <Image src={item} width={100} height={100} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
