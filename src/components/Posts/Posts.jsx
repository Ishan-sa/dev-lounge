import { useState, useEffect } from "react";
import Card1 from "../Card/Card";

export default function Posts() {
  const cardData = [
    {
      id: 1,
      topHeader: "Next.js / React",
      title: "What is the useEffect Hook?",
    },
    {
      id: 2,
      topHeader: "Next.js",
      title: "What are states in React?",
    },
    {
      id: 3,
      topHeader: "Next.js",
      title: "Why use Next.js instead of CRA?",
    },
  ];
  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">
            Coding Chronicles: Tales from the Keyboard
          </h1>
          <hr className="w-[100px] border-t-4 border-[#0072f5]" />
        </div>
        <div>
          <p className="text-[#3d3d3d] font-semibold tracking-widest">
            LATEST FROM THE BLOG
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mt-4">
          {cardData.map((card) => (
            <Card1
              key={card.id}
              topHeader={card.topHeader}
              title={card.title}
            />
          ))}
        </div>
      </div>
    </>
  );
}
