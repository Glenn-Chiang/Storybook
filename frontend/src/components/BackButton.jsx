import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="bg-sky-200 text-sky-500 hover:bg-sky-300 p-2 rounded-lg flex gap-2 items-center">
      <FontAwesomeIcon icon={faChevronLeft} />
      Back
    </button>
  );
}
