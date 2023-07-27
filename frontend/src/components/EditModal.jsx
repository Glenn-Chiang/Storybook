/* eslint-disable react/prop-types */
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import PostForm from "./PostForm";
import postService from "../services/postService";
import { useContext } from "react";
import { PostContext } from "./Post/PostContext";

export default function EditModal({ closeModal, setPosts }) {
  const postToUpdate = useContext(PostContext)

  const handleSubmit = async (formData) => {
    const lastUpdated = new Date();

    try {
      await postService.update(postToUpdate.id, {title: formData.title, content: formData.content, lastUpdated});
      setPosts();
    } catch (error) {
      console.log("Error editing post: ", error.response.data.error);
    }
    closeModal();
  };

  return (
    <Modal>
      <h1 className="p-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faEdit} />
        Edit Post
      </h1>
      <PostForm post={postToUpdate} closeForm={closeModal} onSubmit={handleSubmit} />
    </Modal>
  );
}
