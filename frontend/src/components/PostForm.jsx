/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ErrorAlert from "./errorAlert";
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
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-col ">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            defaultValue={post ? post.title : ""}
            {...register("title", { required: "Title is required" })}
            className="shadow text-slate-500 rounded p-2 w-80"
          ></input>
        </div>
        {errors.title && <ErrorAlert>{errors.title.message}</ErrorAlert>}

        <div className="flex gap-4 flex-col ">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            defaultValue={post ? post.content : ""}
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 5,
                message: "Content must have at least 5 characters",
              },
            })}
            className="shadow text-slate-500 rounded p-2 h-40 w-80"
          ></textarea>
        </div>
        {errors.content && <ErrorAlert>{errors.content.message}</ErrorAlert>}
      </div>
      <div className="flex gap-2 p-4">
        <ConfirmButton />
        <CancelButton onClick={handleCancel} />
      </div>
    </form>
  );
}
