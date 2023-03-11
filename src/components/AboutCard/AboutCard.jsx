import React from "react";

export default function AboutCard({ title, description }) {
  return (
    <>
      <div class="overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="text-3xl font-bold mb-4">{title}</div>
          <p class="text-gray-500 leading-relaxed">{description}</p>
        </div>
      </div>
    </>
  );
}
