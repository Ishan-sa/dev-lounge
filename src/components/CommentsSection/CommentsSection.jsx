import { Button, Textarea } from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

import Comment from "../Comments/Comment";

export default function CommentsSection({ post, onNewComment }) {
  const router = useRouter();
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
        content: formData.get("content"),
        postId: post.id,
      }),
    }).then((res) => {
      if (res.ok) {
        e.target.reset();
        onNewComment();
      }
    });
  };

  async function handleDelete(id) {
    try {
      await axios.delete(`/api/comment/${id}`);
      onNewComment();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 my-8 w-full">
        <h1 className="text-xl font-bold mb-2">Comments</h1>
        {post.comments?.length
          ? post.comments.map(({ id, content, user }) => (
              <Comment
                key={id}
                content={content}
                user={user}
                onDelete={handleDelete}
              />
            ))
          : "No comments yet :("}
        {showForm ? (
          <>
            <form
              className="flex flex-col border-t-2 mt-4"
              onSubmit={(e) => handleSubmit(e)}
            >
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
          <div className="bg-[#cbeaff] py-2 text-center rounded-lg my-2">
            <h1 className="text-lg">You need to be signed in to comment.</h1>
            <p
              className="text-blue-500 cursor-pointer font-semibold"
              onClick={() => signIn()}
            >
              Sign In now
            </p>
          </div>
        )}
      </div>
    </>
  );
}
