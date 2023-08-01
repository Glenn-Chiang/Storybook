import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CommentsPage() {
  return (
    <div>
      <h1>
        <FontAwesomeIcon icon={faComment} />
        Comments
      </h1>
    </div>
  );
}
