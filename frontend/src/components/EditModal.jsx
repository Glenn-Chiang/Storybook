/* eslint-disable react/prop-types */
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import PostForm from "./PostForm";
import postService from "../services/postService";

export default function EditModal({ post: postToUpdate, closeModal, setPosts }) {
  const handleSubmit = async (formData) => {
    const lastUpdated = new Date();
    const updatedPost = {
      ...postToUpdate,
      title: formData.title,
      content: formData.content,
      lastUpdated,
    };

    try {
      await postService.update(postToUpdate.id, updatedPost);
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
