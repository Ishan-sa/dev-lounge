import Image from "next/image";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Popup from "../Popover/Popover";
import { Button, Input, Loading } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Comment({
  content,
  user,
  isEditable,
  datePosted,
  onUpdate = () => {},
  onDelete = () => {},
}) {
  const { image: userImage, name: userName } = user;

  const [isEditing, setIsEditing] = useState(false);
  const [showUpdateBtns, setShowUpdateBtns] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsDeleting(true);

    // check if input is empty, if so, don't update
    const formData = new FormData(e.target);
    const content = formData.get("content");
    if (!content) {
      // setIsEditing(false);
      notifyError();
      setIsDeleting(false);
      return;
    }

    setTimeout(() => {
      const formData = new FormData(e.target);
      const content = formData.get("content");
      onUpdate(content);
      e.target.reset();
      setIsEditing(false);
      setIsDeleting(false);
    }, 1000);
  }
  function handleMouseEnter() {
    setShowUpdateBtns(true);
  }
  function handleMouseLeave() {
    setShowUpdateBtns(false);
  }

  const notifyError = () => {
    toast.error("You can't leave the input empty :(", {
      position: "top-right",
    });
  };

  return (
    <div
      className="border-l-8 px-4 hover:bg-gray-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex gap-2 items-center justify-between ">
        <div className="flex gap-4 items-center w-[90%] justify-between">
          <div className="flex justify-center items-center gap-4">
            <Image
              src={
                userImage ||
                "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
              }
              width={40}
              height={40}
              className="rounded-full avatar-comment"
              alt="profile-image"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800">{userName ?? ""}</p>
                <p className="text-gray-500 text-xs">{datePosted}</p>
              </div>
              <p>{content}</p>

              {isEditing && (
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center justify-center gap-4 comment"
                >
                  <Input
                    type="text"
                    name="content"
                    placeholder="Update your comment"
                    className="m-0 text-[#272727]"
                    clearable
                    contentRight={isDeleting && <Loading size="xs" />}
                    color="primary"
                    width="100%"
                  />
                  <div className="flex gap-2 w-full btn-cont">
                    <Button
                      type="submit"
                      auto
                      className="bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      Update
                    </Button>
                    <Button
                      auto
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-red-500 !important hover:bg-red-700 text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
          {/* <div className="flex">
            <p className="text-gray-500 text-sm">{datePosted}</p>
          </div> */}
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
