/* eslint-disable react/prop-types */
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ConfirmButton({children, onClick}) {
  return (
    <button onClick={onClick} className="shadow text-white p-2 rounded-xl bg-teal-400 hover:bg-teal-500 ">
      {children}
    </button>
  );
}

export function CancelButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-white p-2 rounded-xl bg-rose-400 hover:bg-rose-500 shadow"
    >
      Cancel
    </button>
  );
}
export function EditButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl w-8 h-8 flex justify-center items-center"
    >
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );
}

export function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-rose-400 text-white rounded-xl w-8 h-8 flex justify-center items-center hover:bg-rose-500"
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}
