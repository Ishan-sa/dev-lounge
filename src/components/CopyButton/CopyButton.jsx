import { IoCopyOutline } from "react-icons/io5";

function CopyButton({ onClick = () => {}, content }) {
  return (
    <>
      <div onClick={onClick}>{content}</div>
    </>
  );
}

export default CopyButton;
