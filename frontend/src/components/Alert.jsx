import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* eslint-disable react/prop-types */
function Alert({ children, colours }) {
  return (
    <div
      className={`fixed top-12 right-2 p-2 rounded border-2 flex gap-2 items-center ${colours}`}
    >
      <FontAwesomeIcon icon={faCheckCircle} />
      {children}
    </div>
  );
}

function SuccessAlert({ children }) {
  return (
    <Alert colours="bg-emerald-200 text-emerald-500 border-emerald-400">
      {children}
    </Alert>
  );
}

function ErrorAlert({ children }) {
  return (
    <Alert colours={"bg-rose-200 text-rose-500 border-rose-400"}>
      {children}
    </Alert>
  );
}

// TODO: Loading alert

export { SuccessAlert, ErrorAlert };
