/* eslint-disable react/prop-types */
import Modal from "./Modal";


export default function EditModal({ note, closeModal }) {
    const handleSubmit = (data) => {
      closeModal();
    };
  
    return (
      <Modal>
        <h1 className="p-4 flex items-center gap-2">
          <FontAwesomeIcon icon={faEdit} />
          Edit Note
        </h1>
        <NoteForm note={note} closeForm={closeModal} onSubmit={handleSubmit} />
      </Modal>
    );
  }