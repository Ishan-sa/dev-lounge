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

  const notify = (message, type, position) => {
    switch (type) {
      case "success":
        toast.success(message, {
          position: position || "top-right",
        });
        break;
      case "info":
        toast.info(message, {
          position: position || "top-right",
        });
        break;
      case "error":
        toast.error(message, {
          position: position || "top-right",
        });
        break;
      default:
        toast(message, {
          position: position || "top-right",
        });
        break;
    }
  };

  async function handleSubmit(e) {
    if (!session) {
      alert("You need to be signed in to delete a comment.");
      return;
    }
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const content = formData.get("content");

      if (!content) {
        notify(
          "BRUH, at least write something in the comment section💀",
          "error"
        );
        return;
      }

      await axios.post(`/api/comment`, {
        content,
        postId: post.id,
      });
      e.target.reset();
      onMutate();
      notify("Damn, you added a comment, cool.", "success");
    } catch (error) {
      notify("Something went wrong!", "error");
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
      notify("Wow, you can edit comments too? Cool.");
    } catch (error) {
      notify(
        "Something went wrong! idk what, figure it out yourself.",
        "error"
      );
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
      notify(
        "Why did you even make the comment if you wanted to delete it at the end? Anyways, it's gone now.",
        "info"
      );
    } catch (error) {
      setDeletingCommentId(null);
      notify(
        "Something went wrong! idk what, figure it out yourself.",
        "error"
      );
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 my-8 w-full">
        <h1 className="text-xl font-bold mb-2">Comments</h1>
        {comments && comments.length > 0 ? (
          comments.map(({ id, content, user, createdAt }) => {
            // Format date as per the requirements
            const dateObj = new Date(createdAt);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            let date;
            if (dateObj.toDateString() === today.toDateString()) {
              // Today's date
              const hours = dateObj.getHours() % 12 || 12; // Convert to 12-hour format
              const minutes = dateObj.getMinutes();
              const amPm = dateObj.getHours() < 12 ? "AM" : "PM";
              const time =
                hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + amPm;
              date = "Today at " + time;
            } else if (dateObj.toDateString() === yesterday.toDateString()) {
              // Yesterday's date
              const hours = dateObj.getHours() % 12 || 12; // Convert to 12-hour format
              const minutes = dateObj.getMinutes();
              const amPm = dateObj.getHours() < 12 ? "AM" : "PM";
              const time =
                hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + amPm;
              date = "Yesterday at " + time;
            } else {
              // Older than yesterday
              const options = {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              };
              date = dateObj.toLocaleDateString("en-US", options);
            }

            // Render Comment component
            return (
              <div key={id}>
                <Comment
                  content={content}
                  user={user}
                  datePosted={date}
                  isEditable={session && user.id === session.user.id}
                  onUpdate={(content) => handleUpdate(id, content)}
                  onDelete={() => handleDelete(id)}
                />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-xl font-bold mb-2">No comments yet.</h1>
            <p className="text-gray-500">Be the first one to comment!</p>
          </div>
        )}

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
