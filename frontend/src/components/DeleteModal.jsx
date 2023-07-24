/* eslint-disable react/no-unescaped-entities */
import Modal from "./Modal";
import { ConfirmButton, CancelButton } from "./buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import postService from '../services/postService'

/* eslint-disable react/prop-types */
export default function DeleteModal({ post: postToDelete, closeModal, setPosts }) {

  const {handleSubmit} = useForm()

    const onSubmit = async () => {
      try {
        await postService.deletePost(postToDelete.id)
        setPosts()
      } catch (error) {
        console.log('Error deleting post: ', error)
      }
      closeModal();
    };
  
    const handleCancel = () => {
      closeModal();
    };
  
    return (
      <Modal>
        <h1 className="p-4 flex items-center gap-2">
          <FontAwesomeIcon icon={faXmarkCircle} />
          Delete Post
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-center">
            Are you sure you want to delete your post '{postToDelete.title}'?
          </p>
          <div className="flex gap-2 p-4 justify-center">
            <ConfirmButton />
            <CancelButton onClick={handleCancel} />
          </div>
        </form>
      </Modal>
    );
  }