import { CopyBlock, dracula } from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CopyButton({ children, language }) {
  return (
    <>
      <div>
        <CopyToClipboard text={children}>
          <button>Copy</button>
        </CopyToClipboard>
        <CopyBlock
          text={children}
          language={language}
          theme={dracula}
          showLineNumbers
        />
      </div>
    </>
  );
}
