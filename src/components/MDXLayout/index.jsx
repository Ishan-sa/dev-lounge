import { useRouter } from "next/router";
import Comments from "../Comments/Comments";
export default function Layout({ children }) {
  const router = useRouter();
  const pathParams = router.pathname;
  const slug = pathParams.split("/").pop();

  //   useEffect(() => {
  //lad all coments for post with slug slug
  //   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // post('/api/savecomment', {
    //     comment: "yo",
    //     postslug: slug
    // })
  };

  return (
    <div className="flex flex-col px-8 max-w-[800px] m-auto">
      {children}
      <Comments />
    </div>
  );
}
