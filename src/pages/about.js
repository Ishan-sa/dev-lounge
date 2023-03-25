import AboutCard from "@/components/AboutCard/AboutCard";
import { cardData } from "@/components/AboutCard/data";

export default function about() {
  return (
    <>
      <div class="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
            About Us
          </h2>
          <p class="text-lg text-gray-500 mb-8">
            We are a team of passionate web developers who love to share our
            knowledge with the community. Our mission is to provide quality
            tutorials and articles that help beginners and advanced users
            improve their skills in web development.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
