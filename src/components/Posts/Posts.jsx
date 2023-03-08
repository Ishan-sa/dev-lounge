import { useState, useEffect } from "react";
import Card1 from "../Card/Card";

export default function Posts({ cardData, title, subtitle }) {
  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <hr className="w-[100px] border-t-4 border-[#0072f5]" />
        </div>
        <div>
          <p className="text-[#3d3d3d] font-semibold tracking-widest">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mt-4">
          {cardData}
        </div>
      </div>
    </>
  );
}
