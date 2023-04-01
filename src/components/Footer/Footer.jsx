import React from "react";

export default function Footer() {
  return (
    <>
      <div className="flex justify-between px-8 items-center bg-gray-50 text-gray-700 font-semibold  bottom-0 z-10 w-full py-2 fixed">
        <p>© 2023</p>
        <p>
          Made with <span className="text-red-500">❤️</span> by Ishan.
        </p>
      </div>
    </>
  );
}
