/* eslint-disable react/no-unescaped-entities */
import Modal from "./components/Modal";
import { ConfirmButton, CancelButton } from "./components/buttons";

/* eslint-disable react/prop-types */
export default function DeleteModal({ note, closeModal }) {
    const handleSubmit = (event) => {
      event.preventDefault();
      closeModal();
    };
  
    const handleCancel = () => {
      closeModal();
    };
  
    return (
      <Modal>
        <h1 className="p-4 flex items-center gap-2">
          <FontAwesomeIcon icon={faXmarkCircle} />
          Delete Note
        </h1>
        <form onSubmit={handleSubmit}>
          <p className="text-center">
            Are you sure you want to delete your note '{note.title}'?
          </p>
          <div className="flex gap-2 p-4 justify-center">
            <ConfirmButton />
            <CancelButton onClick={handleCancel} />
          </div>
        </form>
      </Modal>
    );
  }