import Image from "next/image";
import { useState } from "react";

export default function Comment({ content, user, deleteBtn, editBtn }) {
  const { image: userImage, name: userName } = user;

  const [updateBtns, setUpdateBtns] = useState(false);

  function handleMouseEnter() {
    setUpdateBtns(true);
  }

  function handleMouseLeave() {
    setUpdateBtns(false);
  }

  return (
    <div
      className="border-l-8 px-4 hover:bg-gray-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex gap-2 items-center justify-between ">
        <div className="flex gap-4 items-center">
          <div>
            <Image
              src={
                userImage ||
                "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
              }
              width={40}
              height={40}
              className="rounded-full"
              alt="profile-image"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-gray-800">{userName ?? ""}</p>
            <p>{content}</p>
          </div>
        </div>
        {updateBtns && (
          <div className="flex flex-col gap-2">
            <div className="flex">{deleteBtn}</div>
            <div className="flex">{editBtn}</div>
          </div>
        )}
      </div>
    </div>
  );
}
