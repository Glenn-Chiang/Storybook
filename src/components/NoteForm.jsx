/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ErrorAlert from "./errorAlert";
import { ConfirmButton, CancelButton } from "./buttons";

export default function NoteForm({ note, closeForm, onSubmit }) {
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
          <div className="flex gap-4 flex-col">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              defaultValue={note ? note.title : ""}
              {...register("title", { required: "Title is required" })}
              className="shadow text-slate-400 rounded p-1 "
            ></input>
          </div>
          {errors.title && <ErrorAlert>{errors.title.message}</ErrorAlert>}
  
          <div className="flex gap-4 flex-col">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              defaultValue={note ? note.content : ""}
              {...register("content", { required: "Content is required" })}
              className="shadow text-slate-400 rounded p-1 h-40 "
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