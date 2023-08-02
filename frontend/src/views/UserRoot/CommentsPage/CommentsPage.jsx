import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData } from "react-router-dom";

export default function CommentsPage() {
  const comments = useLoaderData();
  return (
    <main>
      <h1>
        <FontAwesomeIcon icon={faComment} />
        Comments
      </h1>
      <section>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
