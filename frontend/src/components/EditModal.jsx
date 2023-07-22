/* eslint-disable react/prop-types */
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import PostForm from "./PostForm";
import postService from "../services/postService";

export default function EditModal({ post, closeModal, setPosts }) {

  const handleSubmit = async (data) => {
    const lastUpdated = new Date();
    const updatedPost = { ...data, lastUpdated };

    try {
      await postService.update(data.id, updatedPost)
      setPosts(posts => posts.map(post => post.id === data.id ? updatedPost : post));
    } catch (error) {
      console.log("Error updating post: ", error);
    }
    closeModal();
  };

  return (
    <Modal>
      <h1 className="p-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faEdit} />
        Edit Post
      </h1>
      <PostForm post={post} closeForm={closeModal} onSubmit={handleSubmit} />
    </Modal>
  );
}
