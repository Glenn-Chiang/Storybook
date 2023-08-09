/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { ConfirmButton, CancelButton } from "./buttons";

export default function PostForm({ post, closeForm, onSubmit }) {
  const handleCancel = () => {
    closeForm();
  };

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  return (
    <form
      className="flex flex-col items-center w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 flex-col ">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            defaultValue={post ? post.title : ""}
            {...register("title", { required: "Title is required" })}
            className="shadow bg-slate-100 text-slate-500 rounded p-2 w-full"
          ></input>
        </div>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

        <div className="flex gap-4 flex-col ">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            defaultValue={post ? post.content : ""}
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 5,
                message: "Content must contain at least 5 characters",
              },
            })}
            className="shadow bg-slate-100 text-slate-500 rounded p-2 h-40 w-full"
          ></textarea>
        </div>
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>
      <div className="flex gap-2 p-4">
        <ConfirmButton>Confirm</ConfirmButton>
        <CancelButton onClick={handleCancel} />
      </div>
    </form>
  );
}
