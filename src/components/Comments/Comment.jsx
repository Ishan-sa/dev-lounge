import Image from "next/image";
import { AiFillEdit } from "react-icons/ai";

export default function Comment({ content, user, authenticatedUser }) {
  const { image: userImage, name: userName } = user;
  const isOwner = authenticatedUser && authenticatedUser.id === user.id;
  return (
    <div className="border-l-8 px-4">
      <div className="flex gap-2 items-center">
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
        <div>
          <p className="font-semibold text-gray-800">{userName ?? ""}</p>
          <p>{content}</p>
        </div>
        {isOwner && <AiFillEdit />}
      </div>
    </div>
  );
}
