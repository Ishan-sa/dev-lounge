import PropTypes from "prop-types";
import Prism from "prismjs";
import "prism-themes/themes/prism-dracula.css";
import CopyButton from "../CopyButton/CopyButton";
import "prismjs/components/prism-jsx";
import { useState, useRef, useEffect } from "react";
import { IoCopyOutline, IoCheckmarkDoneOutline } from "react-icons/io5";

function CodeBlock({ children, className }) {
  const codeRef = useRef(null);
  const language = className ? className.replace(/language-/, "") : "";
  const text = children.trim();

  useEffect(() => {
    Prism.highlightElement(codeRef.current);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setContent(
        <div className="absolute top-0 right-0 flex flex-row items-center">
          <p className="text-[#9aacc4] mr-[4rem] mt-[1rem] bg-[#3f4750] px-4 py-1 rounded-lg ">
            Copied!
          </p>
          <IoCheckmarkDoneOutline className="absolute top-0 right-0 m-[1rem] text-[#7f8ea2] text-3xl hover:text-[#9aacc4] duration-200 cursor-pointer bg-[#3f4750] p-[5px] rounded-lg hover:bg-[#58626e]" />
        </div>
      );
      setTimeout(() => {
        setContent(
          <IoCopyOutline className="absolute top-0 right-0 m-[1rem] text-[#7f8ea2] text-3xl hover:text-[#9aacc4] duration-200 cursor-pointer bg-[#3f4750] p-[5px] rounded-lg hover:bg-[#58626e]" />
        );
      }, 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const [content, setContent] = useState(
    <IoCopyOutline className="absolute top-0 right-0 m-[1rem] text-[#7f8ea2] text-3xl hover:text-[#9aacc4] duration-200 cursor-pointer bg-[#3f4750] p-[5px] rounded-lg hover:bg-[#58626e]" />
  );

  return (
    <div className="relative">
      <CopyButton text={text} onClick={handleCopy} content={content} />
      <pre className={`language-${language}`}>
        <code ref={codeRef} className={`language-${language}`}>
          {text}
        </code>
      </pre>
    </div>
  );
}

CodeBlock.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CodeBlock;
