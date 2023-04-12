import { IoCopyOutline } from "react-icons/io5";

function CopyButton({ onClick = () => {} }) {
  return (
    <>
      <IoCopyOutline
        className="absolute top-0 right-0 m-[1rem] text-[#7f8ea2] text-3xl hover:text-[#9aacc4] duration-200 cursor-pointer bg-[#3f4750] p-[5px] rounded-lg hover:bg-[#58626e]"
        onClick={onClick}
      />
    </>
  );
}

export default CopyButton;
