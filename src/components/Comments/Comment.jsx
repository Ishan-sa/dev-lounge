import Image from "next/image";

export default function Comment({ content, user }) {
  const { image: userImage, name: userName } = user;
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
          />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{userName ?? ""}</p>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
