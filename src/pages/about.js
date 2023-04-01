import AboutCard from "@/components/AboutCard/AboutCard";
import { cardData } from "@/components/AboutCard/data";
import Image from "next/image";

export default function about() {
  return (
    <>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-left">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
            About Me
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Welcome to my blog! My name is Ishan Sachdeva, and I'm a frontend
            developer with a passion for creating visually appealing and
            user-friendly applications.
          </p>

          <p className="text-lg text-gray-500 mb-8">
            I created this blog to share my knowledge and experiences in web
            development with others who share my interest. As a frontend
            developer with over 2 years of experience in the industry, I've
            gained a strong foundation in responsive design and frontend
            libraries and frameworks such as React and NextJS.
          </p>

          <p className="text-lg text-gray-500 mb-8">
            However, I've also discovered that there is always more to learn,
            and I am constantly looking for new challenges to improve my skills.
            Through this blog, I hope to provide insights and tips on web
            development that are both informative and engaging. Whether you're
            just starting out in the field or are a seasoned developer, I hope
            you'll find something useful here. Thank you for visiting, and
            please feel free to contact me if you have any questions or
            feedback.
          </p>
        </div>

        <div>
          <Image />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => {
            return (
              <AboutCard
                key={index}
                title={card.title}
                description={card.desciption}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
