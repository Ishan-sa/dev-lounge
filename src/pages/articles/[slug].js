// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import remark from "remark";
// import html from "remark-html";

// export default function Post({ metadata, content }) {
//   return (
//     <div>
//       <h1>{metadata.title}</h1>
//       <p>{metadata.date}</p>
//       <div dangerouslySetInnerHTML={{ __html: content }} />
//     </div>
//   );
// }

// export async function getServerSideProps({ params }) {
//   const { slug } = params;

//   const files = fs.readdirSync(path.join(process.cwd(), "pages", "articles"));
//   const postFile = files.find((file) => file.startsWith(slug));

//   const postFilePath = path.join(process.cwd(), "pages", "articles", postFile);
//   const fileContents = fs.readFileSync(postFilePath, "utf8");
//   const { data, content } = matter(fileContents);
//   const htmlContent = await remark().use(html).process(content);

//   return {
//     props: {
//       metadata: data,
//       content: htmlContent.toString(),
//     },
//   };
// }

import React from "react";

export default function slug() {
  return <div>hi</div>;
}
