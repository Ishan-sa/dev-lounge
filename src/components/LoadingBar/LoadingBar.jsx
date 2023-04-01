import { useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";

export default function MyLoadingBar() {
  const [progress, setProgress] = useState(0);
  const loadingRef = useRef(null);

  function handleProgress() {
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }

  return (
    <>
      <LoadingBar
        color={"#4287f5"}
        progress={progress}
        shadow={true}
        onLoaderFinished={() => setProgress(0)}
      />
    </>
  );
}
