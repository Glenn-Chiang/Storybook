import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* eslint-disable react/prop-types */
export default function ErrorMessage({ children }) {
  return (
    <p className="text-rose-500 bg-rose-200 p-2 rounded flex gap-2 items-center">
      <FontAwesomeIcon icon={faExclamationCircle} />
      {children}
    </p>
  );
}
