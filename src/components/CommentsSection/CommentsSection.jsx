import { Button, Textarea } from "@nextui-org/react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Comment from "../Comments/Comment";

export default function CommentsSection({ post, onMutate }) {
  const { data: session } = useSession();
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  const { comments } = post;

  async function handleSubmit(e) {
    if (!session) {
      alert("You need to be signed in to delete a comment.");
      return;
    }
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const content = formData.get("content");
      await axios.post(`/api/comment`, {
        content,
        postId: post.id,
      });
      e.target.reset();
      onMutate();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(id, content) {
    if (!session) {
      alert("You need to be signed in to delete a comment.");
      return;
    }
    try {
      await axios.put(`/api/comment/${id}`, {
        content,
      });
      onMutate();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    if (!session) {
      alert("You need to be signed in to delete a comment.");
      return;
    }
    setDeletingCommentId(id);
    try {
      await axios.delete(`/api/comment/${id}`);
      onMutate();
    } catch (error) {
      setDeletingCommentId(null);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 my-8 w-full">
        <h1 className="text-xl font-bold mb-2">Comments</h1>
        {Array.isArray(comments)
          ? comments.map(({ id, content, user }) => (
              <div key={id}>
                <Comment
                  content={content}
                  user={user}
                  isEditable={session && user.id === session.user.id}
                  onUpdate={(content) => handleUpdate(id, content)}
                  onDelete={() => handleDelete(id)}
                />
              </div>
            ))
          : "No comments yet :("}
        {session ? (
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
