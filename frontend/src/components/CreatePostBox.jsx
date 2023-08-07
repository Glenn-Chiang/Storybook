/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PostForm from "./PostForm";
import postService from "../services/postService";
import PostsContext from "../contexts/PostsContext";

export default function CreatePostBox() {
  const [showForm, setShowForm] = useState(false);
  const updatePostsState = useContext(PostsContext)

  const handleClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    const datePosted = new Date();
    const lastUpdated = datePosted;
    const newPost = { ...formData, datePosted, lastUpdated};
    try {
      setShowForm(false);
      await postService.create(newPost);
      updatePostsState()
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
