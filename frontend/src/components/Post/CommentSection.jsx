/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { CancelButton, ConfirmButton } from "../buttons";
import { useForm } from "react-hook-form";
import ErrorAlert from "../errorAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import commentService from '../../services/commentService'
import { PostContext } from "./PostContext";

export default function CommentSection() {
  const comments = [
    {
      author: "Homelander",
      content: "Who put the blanket there?!",
      datePosted: new Date(),
    },
    {
      author: "The Deep",
      content: "I'm going to renew my light.",
      datePosted: new Date(),
    },
  ];

  const [commentFormVisible, setCommentFormVisible] = useState(false);

  return (
    <div>
      <h2 className="py-4">Comments ({comments.length})</h2>
      {commentFormVisible ? (
        <CommentForm closeForm={() => setCommentFormVisible(false)}/>
      ) : (
        <button
          className="text-white bg-sky-500 hover:bg-sky-600 p-2 rounded-xl flex gap-2 items-center"
          onClick={() => setCommentFormVisible(true)}
        >
          <FontAwesomeIcon icon={faPlusCircle}/>
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
        <p>No comments</p>
      )}
    </div>
  );
}

function CommentForm({closeForm}) {
  const post = useContext(PostContext)

  const handleCancel = () => {
    closeForm();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const comment = {
      content: formData.content
    }
    try {
      await commentService.create(post.id, comment)
      closeForm()
    } catch (error) {
      console.log('Error posting comment: ', error)
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
  return (
    <div>
      <p>{comment.author}</p>
      <p className="text-slate-400">{comment.datePosted.toLocaleString()}</p>
      <p className="text-slate-500">{comment.content}</p>
    </div>
  );
}
