import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Comment({ content }) {
  const { data: session } = useSession();

  return (
    <div className="border-l-8 px-4">
      {/* <div className="font-bold mt-2">{title}</div>
      <p className="m-4">{content}</p> */}
      <div className="flex gap-2 items-center">
        <div>
          <Image
            src={session?.user?.image}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{session?.user?.name}</p>
          {/* <p className="font-semibold text-gray-800">{title}</p> */}
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
