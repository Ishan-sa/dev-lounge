import { Button, Input, Textarea } from "@nextui-org/react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

import Comment from "../Comments/Comment";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CommentsSection({ postid }) {
  const { data: comments } = useSWR(`/api/comment?postid=${postid}`, fetcher);

  const { data: session } = useSession();

  const showForm = session;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // title: formData.get("title"),
        content: formData.get("content"),
        postid,
      }),
    }).then((res) => {
      if (res.ok) {
        e.target.reset();
      }
    });
  };
  return (
    <>
      <div className="flex flex-col gap-2 my-8 w-full">
        <h1 className="text-xl font-bold mb-2">Comments</h1>
        {comments?.length
          ? comments.map(({ id, title, content }) => (
              <Comment key={id} title={title} content={content}></Comment>
            ))
          : "No comments yet :("}
        {showForm ? (
          <>
            <form
              className="flex flex-col border-t-2 mt-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              {/* <div className="w-full flex mt-8">
                <Input
                  labelPlaceholder="Title"
                  status="default"
                  fullWidth={true}
                  clearable={true}
                  name="title"
                />
              </div> */}
              <div className="w-full flex mt-8">
                <Textarea
                  labelPlaceholder="Add a comment..."
                  status="default"
                  fullWidth={true}
                  clearable={true}
                  name="content"
                />
              </div>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white mt-4"
                auto
              >
                Submit
              </Button>
            </form>
          </>
        ) : (
          <h1 className="text-lg">You need to be signed in to comment.</h1>
        )}
      </div>
    </>
  );
}
