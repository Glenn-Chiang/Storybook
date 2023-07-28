/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import { CancelButton, ConfirmButton } from "../buttons";
import { useForm } from "react-hook-form";
import ErrorAlert from "../errorAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import commentService from "../../services/commentService";
import { PostContext } from "./PostContext";

export default function CommentSection({ comments, setPosts }) {
  const [commentFormVisible, setCommentFormVisible] = useState(false);

  return (
    <div className="p-4 rounded-xl">
      <h2 className="py-4">Comments ({comments.length})</h2>
      {commentFormVisible ? (
        <CommentForm
          closeForm={() => setCommentFormVisible(false)}
          setPosts={setPosts}
        />
      ) : (
        <button
          className="text-white bg-sky-500 hover:bg-sky-600 p-2 rounded-xl flex gap-2 items-center"
          onClick={() => setCommentFormVisible(true)}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
          Post a comment
        </button>
      )}
      {comments?.length > 0 ? (
        <ul className="flex flex-col gap-4 py-4">
          {comments.map((comment, index) => (
            <li key={index}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-4 text-slate-500">No comments</p>
      )}
    </div>
  );
}

function CommentForm({ closeForm, setPosts }) {
  const post = useContext(PostContext);

  const handleCancel = () => {
    closeForm();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm();
  
  useEffect(() => {
    setFocus("content")
  }, [setFocus]);

  const onSubmit = async (formData) => {
    const commentData = {
      content: formData.content,
      datePosted: new Date(),
    };
    try {
      await commentService.create(post.id, commentData);
      closeForm();
      setPosts();
    } catch (error) {
      console.log("Error posting comment: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-col flex gap-4 py-4"
    >
      <textarea
        className="shadow bg-slate-100 rounded p-2 text-slate-500"
        {...register("content", {
          required: "Comment cannot be empty",

          minLength: {
            value: 5,
            message: "Comment must contain at least 5 characters",
          },
        })}
      />
      {errors.content && <ErrorAlert>{errors.content.message}</ErrorAlert>}
      <div className="flex gap-2">
        <ConfirmButton>Post comment</ConfirmButton>
        <CancelButton onClick={handleCancel} />
      </div>
    </form>
  );
}

function Comment({ comment }) {
  console.log(comment.author)
  return (
    <div>
      <p>{comment.author.displayName}</p>
      <p className="text-slate-400">
        {new Date(comment.datePosted).toLocaleString()}
      </p>
      <p className="text-slate-500">{comment.content}</p>
    </div>
  );
}
