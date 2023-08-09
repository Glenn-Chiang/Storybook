import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { CancelButton, ConfirmButton } from "./buttons";

/* eslint-disable react/prop-types */
export default function CommentForm({ onSubmit, closeForm, defaultValue }) {
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
      {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
      <div className="flex gap-2">
        <ConfirmButton>Post comment</ConfirmButton>
        <CancelButton onClick={handleCancel} />
      </div>
    </form>
  );
}
