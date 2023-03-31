import { Button, Textarea } from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import Comment from "../Comments/Comment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Popup from "../Popover/Popover";
import { CiMenuKebab } from "react-icons/ci";

export default function CommentsSection({ post, onNewComment }) {
  const { data: session } = useSession();
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  // const [initialComment, setInitialComment] = useState(null);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: comments } = useSWR(`/api/comment?postId=${post.id}`, fetcher);

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
    if (!session) {
      alert("You need to be signed in to delete a comment.");
      return;
    }

    setDeletingCommentId(id);

    try {
      await axios.delete(`/api/comment/${id}`);
      onNewComment();

      mutate(`/api/comment?postId=${post.id}`, (cachedData) => {
        return cachedData.filter((comment) => comment.id !== id);
      });
    } catch (error) {
      setDeletingCommentId(null);
      console.log(error);
      return <div>Error loading comments</div>;
    }

    if (!comments) {
      return <div>Loading comments...</div>;
    }
  }

  async function handleEdit(id) {
    setEditMode(true);

    if (!session) {
      alert("You need to be signed in to edit a comment.");
      return;
    }

    try {
      await axios.put(`/api/comment/${id}`);
      onNewComment();

      mutate(`/api/comment?postId=${post.id}`, (cachedData) => {
        return cachedData.filter((comment) => comment.id !== id);
      });
    } catch (error) {
      setEditMode(false);
      console.log(error);
      return <div>Error loading comments</div>;
    }

    if (!comments) {
      return <div>Loading comments...</div>;
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 my-8 w-full">
        <h1 className="text-xl font-bold mb-2">Comments</h1>
        {post.comments?.length
          ? post.comments.map(({ id, content, user }) => (
              <div key={id}>
                <Comment
                  content={content}
                  user={user}
                  showInput={editMode}
                  onChange={(e) => setContent(e.target.value)}
                  deleteBtn={
                    session &&
                    user.id === session.user.id && (
                      <>
                        <Popup
                          onDeleteClick={() => handleDelete(id)}
                          onEditClick={() => handleEdit(id)}
                          popupIcon={
                            <CiMenuKebab className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl" />
                          }
                        />
                      </>
                    )
                  }
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
