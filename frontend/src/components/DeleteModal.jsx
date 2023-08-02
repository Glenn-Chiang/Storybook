/* eslint-disable react/no-unescaped-entities */
import Modal from "./Modal";
import { ConfirmButton, CancelButton } from "./buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

/* eslint-disable react/prop-types */
export default function DeleteModal({ closeModal, onSubmit, resourceType }) {
  const { handleSubmit } = useForm();

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal>
      <h1 className="p-4 flex items-center gap-2 capitalize">
        <FontAwesomeIcon icon={faTrashCan} />
        Delete {resourceType}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-slate-500">
          Are you sure you want to delete this {resourceType}?
        </p>
        <div className="flex gap-2 p-4 justify-center">
          <ConfirmButton>Confirm</ConfirmButton>
          <CancelButton onClick={handleCancel} />
        </div>
      </form>
    </Modal>
  );
}
