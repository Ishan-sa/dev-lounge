import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function KeepChangingThis() {
  const router = useRouter();
  return (
    <div className=" flex flex-col gap-4">
      <div>
        <h1 className="text-4xl font-semibold">
          Revolutionize Your Website Design with Tailwind CSS: Here's Why?
        </h1>
      </div>

      <div>
        <p>
          Are you tired of writing repetitive CSS code to style your website?
          Tailwind CSS is the answer you've been looking for! In this blog post,
          we'll explore the top reasons why Tailwind is the ultimate tool for
          designing beautiful and responsive websites. From its easy-to-use
          utility classes to its customizable design system, Tailwind has
          everything you need to streamline your workflow and create stunning
          websites in no time. Don't miss out on the opportunity to transform
          your web development game with Tailwind CSS!
        </p>
      </div>

      <div>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white"
          auto
          onClick={() => router.push("/articles/why-tailwind-is-the-goat")}
        >
          Read More
        </Button>
      </div>
    </div>
  );
}
