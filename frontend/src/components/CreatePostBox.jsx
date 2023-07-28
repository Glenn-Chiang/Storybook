/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PostForm from "./PostForm";
import postService from "../services/postService";

export default function CreatePostBox({ setPosts, scrollToTop }) {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    const datePosted = new Date();
    const lastUpdated = datePosted;
    const newPost = { ...data, datePosted, lastUpdated, likes: 0, comments: [] };
    try {
      await postService.create(newPost);
      setPosts(); // Sync application state with database after each crud operation
      setShowForm(false);
      scrollToTop();
    } catch (error) {
      console.log("Error creating post: ", error);
    }
  };

  return (
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
  );
}
