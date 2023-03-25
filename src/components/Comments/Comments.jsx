import { Button, Input, Textarea } from "@nextui-org/react";

export default function Comments({
  handleTitleChange = (e) => {},
  handleCommentChange = (e) => {},
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // post('/api/savecomment', {
    //     comment: "yo",
    //     postslug: slug
    // })
  };

  return (
    <>
      <div className="flex flex-col my-8 gap-4 w-full">
        <h1 className="text-xl font-bold">Comments</h1>
        <form
          className="flex flex-col gap-8 mt-[15px]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="w-full flex">
            <Input
              labelPlaceholder="Title"
              status="default"
              fullWidth={true}
              clearable={true}
              onChange={(e) => handleTitleChange(e)}
            />
          </div>
          <div className="w-full flex">
            <Textarea
              labelPlaceholder="Add a comment..."
              status="default"
              fullWidth={true}
              clearable={true}
              onChange={(e) => handleCommentChange(e)}
            />
          </div>
        </form>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white" auto>
          Submit
        </Button>
      </div>
    </>
  );
}
