import React from "react";
import PropTypes from "prop-types";
import Prism from "prismjs";
import "prism-themes/themes/prism-dracula.css";
import CopyButton from "../CopyButton/CopyButton";
import "prismjs/components/prism-jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CodeBlock({ children, className }) {
  const codeRef = React.useRef(null);
  const language = className ? className.replace(/language-/, "") : "";
  const text = children.trim();

  React.useEffect(() => {
    Prism.highlightElement(codeRef.current);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      notifyCopy();
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const notifyCopy = () => {
    toast("Copied to clipboard", {
      position: "top-right",
    });
  };

  return (
    <div className="relative">
      <CopyButton text={text} onClick={handleCopy} />
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
