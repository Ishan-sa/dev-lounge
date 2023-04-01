import { Button, Textarea } from "@nextui-org/react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Comment from "../Comments/Comment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      notifyAdd();
    } catch (error) {
      notifyError();
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
      notifyUpdate();
    } catch (error) {
      notifyError();
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
      notifyDelete();
    } catch (error) {
      setDeletingCommentId(null);
      notifyError();
    }
  }

  const notifyAdd = () => {
    toast.success("Comment added successfully!", {
      position: "top-right",
    });
  };

  const notifyDelete = () => {
    toast.info("Comment deleted successfully!", {
      position: "top-right",
    });
  };

  const notifyError = () => {
    toast.error("Something went wrong!", {
      position: "top-right",
    });
  };

  const notifyUpdate = () => {
    toast("Comment updated successfully!", {
      position: "top-right",
    });
  };

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
