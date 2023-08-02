import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData } from "react-router-dom";
import Comment from "./Comment";

export default function CommentsPage() {
  const comments = useLoaderData();
  console.log(comments[0])
  return (
    <main className="flex flex-col items-center">
      <h1>
        <FontAwesomeIcon icon={faComment} />
        Comments
      </h1>
      <section>
        <ul className="flex flex-col gap-8">
          {comments.map((comment) => (
            <li key={comment.id}>
              <Comment comment={comment}/>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
