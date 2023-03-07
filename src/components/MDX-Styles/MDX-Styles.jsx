const MDXComponents = {
  h1: (props) => <h1 className="text-4xl font-bold" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold" {...props} />,
  h3: (props) => <h3 className="text-2xl font-bold" {...props} />,
  h4: (props) => <h4 className="text-xl font-bold" {...props} />,
  h5: (props) => <h5 className="text-lg font-bold" {...props} />,
  h6: (props) => <h6 className="text-base font-bold" {...props} />,
  p: (props) => <p className="text-base" {...props} />,
  a: (props) => <a className="text-blue-500" {...props} />,
  ul: (props) => <ul className="list-disc ml-5" {...props} />,
  ol: (props) => <ol className="list-decimal ml-5" {...props} />,
  li: (props) => <li className="my-2" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic text-gray-600 "
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="bg-gray-100 rounded-md px-2 py-1 text-sm font-mono text-blue-600"
      {...props}
    />
  ),
  pre: (props) => <pre className="bg-gray-100 p-4 mb-4" {...props} />,
  table: (props) => (
    <table
      className="table-auto border-collapse border border-gray-300"
      {...props}
    />
  ),
  th: (props) => <th className="border border-gray-300 px-4 py-2" {...props} />,
  td: (props) => <td className="border border-gray-300 px-4 py-2" {...props} />,
  div: (props) => (
    <div className="flex flex-col px-8 max-w-[800px] m-auto gap-2" {...props} />
  ),
  centerDiv: (props) => <div className="flex text-center mt-8" {...props} />,
};

export default MDXComponents;
