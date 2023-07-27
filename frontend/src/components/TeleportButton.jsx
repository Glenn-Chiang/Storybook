import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* eslint-disable react/prop-types */
export default function TeleportButton({ forwardedRef }) {
  const handleClick = () => {
    forwardedRef.current.scrollIntoView();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-2 right-2 p-2 rounded-2xl w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white flex justify-center items-center group"
    >
      <FontAwesomeIcon icon={faArrowUp} />
      <p className="absolute -left-32 min-w-max p-2 rounded-xl hidden group-hover:block bg-sky-800">
        Go to Top Post
      </p>
    </button>
  );
}
