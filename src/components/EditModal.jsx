/* eslint-disable react/prop-types */
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import PostForm from "./PostForm";

export default function EditModal({ post, closeModal }) {
  const handleSubmit = (data) => {
    const { title, content } = data;
    const lastUpdated = new Date()
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
