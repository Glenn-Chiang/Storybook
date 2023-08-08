/* eslint-disable react/prop-types */
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import PostForm from "./PostForm";
import { useContext } from "react";
import { PostContext } from "./Post/PostContext";

export default function EditModal({ closeModal, handleSubmit }) {
  const postToUpdate = useContext(PostContext);

  return (
    <Modal>
      <h1 className="p-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faEdit} />
        Edit Post
      </h1>
      <PostForm
        post={postToUpdate}
        closeForm={closeModal}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
