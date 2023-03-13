import { Button, Input, Textarea } from "@nextui-org/react";

export default function Comments({
  handleTitleChange = (e) => {},
  handleCommentChange = (e) => {},
}) {
  return (
    <>
      <div className="flex flex-col my-8 gap-4 w-full">
        <h1 className="text-xl font-bold">Comments</h1>
        <div className="flex flex-col gap-8 mt-[15px]">
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
        </div>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white" auto>
          Submit
        </Button>
      </div>
    </>
  );
}
