import { useContext, useEffect } from "react";
import { PostContext } from "./Post/PostContext";
import { useForm } from "react-hook-form";
import commentService from "../services/commentService";
import ErrorAlert from "./errorAlert";
import { CancelButton, ConfirmButton } from "./buttons";

/* eslint-disable react/prop-types */
export default function CommentForm({ closeForm, reload, defaultValue}) {
  const post = useContext(PostContext);

  const handleCancel = () => {
    closeForm();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  useEffect(() => {
    setFocus("content");
  }, [setFocus]);

  const onSubmit = async (formData) => {
    const commentData = {
      content: formData.content,
      datePosted: new Date(),
    };
    try {
      await commentService.create(post.id, commentData);
      closeForm();
      reload();
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
        defaultValue={defaultValue}
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
