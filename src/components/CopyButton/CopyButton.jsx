import { IoCopyOutline } from "react-icons/io5";

function CopyButton({ text, className = "", onClick = () => {} }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <IoCopyOutline className={className} onClick={onClick} />
    </>
  );
}

export default CopyButton;
