import Image from "next/image";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Popup from "../Popover/Popover";

export default function Comment({
  content,
  user,
  isEditable,
  onUpdate = () => {},
  onDelete = () => {},
}) {
  const { image: userImage, name: userName } = user;

  const [isEditing, setIsEditing] = useState(false);
  const [showUpdateBtns, setShowUpdateBtns] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const content = formData.get("content");
    onUpdate(content);
    e.target.reset();
    setIsEditing(false);
  }
  function handleMouseEnter() {
    setShowUpdateBtns(true);
  }
  function handleMouseLeave() {
    setShowUpdateBtns(false);
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
            {isEditing && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="content"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                />
                <button>Submit</button>
              </form>
            )}
          </div>
        </div>
        {isEditable && showUpdateBtns && (
          <Popup
            onDeleteClick={onDelete}
            onEditClick={() => setIsEditing(!isEditing)}
            popupIcon={
              <CiMenuKebab className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl" />
            }
          />
        )}
      </div>
    </div>
  );
}
