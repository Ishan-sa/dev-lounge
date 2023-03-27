export default function Comment({ title, content }) {
  return (
    <div className="border-l-8 px-4">
      <div className="font-bold mt-2">{title}</div>
      <p className="m-4">{content}</p>
    </div>
  );
}
