/* eslint-disable react/prop-types */
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import PostForm from "./PostForm";
import postService from "../services/postService";
import { useContext } from "react";
import { PostContext } from "./Post/PostContext";
import PostsContext from "../contexts/PostsContext"

export default function EditModal({ closeModal }) {
  const postToUpdate = useContext(PostContext)
  const updatePostsState = useContext(PostsContext)

  const handleSubmit = async (formData) => {
    try {
      await postService.edit(postToUpdate.id, {title: formData.title, content: formData.content, lastUpdated: new Date()});
      updatePostsState()
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
