/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { ConfirmButton, CancelButton } from "../../../components/buttons";
import ErrorAlert from "../../../components/ErrorAlert";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import postService from "../../../services/postService";
import Alert from "../../../components/Alert";

export default function CreatePostPage() {
  const [showForm, setShowForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    const datePosted = new Date();
    const lastUpdated = datePosted;
    const newPost = { ...formData, datePosted, lastUpdated };
    try {
      setShowForm(false);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      await postService.create(newPost);
    } catch (error) {
      console.log("Error creating post: ", error);
    }
  };

  return (
    <main className="py-8">
      <section className="p-4 mb-4 rounded-xl shadow flex flex-col items-center bg-white">
        <h1 className="p-4">Create a Post</h1>
        {showForm ? (
          <PostForm
            closeForm={() => setShowForm(false)}
            onSubmit={handleSubmit}
          />
        ) : (
          <button
            onClick={handleClick}
            className="text-xl text-white bg-sky-500 shadow-md rounded-xl w-20 p-1 hover:bg-sky-600"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </section>
      {showAlert && <Alert>Your post has been submitted!</Alert>}
    </main>
  );
}

function PostForm({ post, closeForm, onSubmit }) {
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
                message: "Content must contain at least 5 characters",
              },
            })}
            className="shadow bg-slate-100 text-slate-500 rounded p-2 h-40 w-full"
          ></textarea>
        </div>
        {errors.content && <ErrorAlert>{errors.content.message}</ErrorAlert>}
      </div>
      <div className="flex gap-2 p-4">
        <ConfirmButton>Create Post</ConfirmButton>
        <CancelButton onClick={handleCancel} />
      </div>
    </form>
  );
}
