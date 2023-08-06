import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData, useParams } from "react-router-dom";
import Comment from "./Comment";
import { useEffect, useState, useCallback } from "react";
import commentService from "../../../services/commentService";

export default function CommentsPage() {
  const userId = useParams().userId;
  const [comments, setComments] = useState(useLoaderData());
  
  const loadComments = useCallback(async () => {
    try {
      const comments = await commentService.getByUser(userId);
      setComments(comments);
    } catch (error) {
      console.log("Error loading comments: ", error);
    }
  }, [userId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return (
    <main className="flex flex-col items-center">
      <h1>
        <FontAwesomeIcon icon={faComment} />
        Comments
      </h1>
      {comments.length > 0 ? (
        <section className="bg-transparent">
          <ul className="flex flex-col gap-8">
            {comments.map((comment) => (
              <li key={comment.id}>
                <Comment comment={comment} loadComments={loadComments} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="text-slate-400">No comments found</section>
      )}
    </main>
  );
}
