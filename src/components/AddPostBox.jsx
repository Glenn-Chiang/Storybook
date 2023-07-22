import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PostForm from "./PostForm";

export default function AddPostBox() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (data) => {
    const { title, content } = data;
    const dateAdded = new Date();
    const lastUpdated = dateAdded;
    const newPost = { title, content, dateAdded, lastUpdated };
    console.log(newPost);
  };

  return (
    <section className="p-4 mb-4 rounded-xl shadow flex flex-col items-center">
      <h1 className="p-4">Add a Post</h1>
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
