/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import CommentForm from "../CommentForm";
import { useState } from "react";

export default function CommentSection({ comments, setPosts }) {
  const [commentFormVisible, setCommentFormVisible] = useState(false);

  return (
    <div className="p-4 rounded-xl">
      <h2 className="py-4">Comments ({comments.length})</h2>
      {commentFormVisible ? (
        <CommentForm
          closeForm={() => setCommentFormVisible(false)}
          reload={setPosts}
          defaultValue={""}
        />
      ) : (
        <button
          className="text-white bg-sky-500 hover:bg-sky-600 p-2 rounded-xl flex gap-2 items-center"
          onClick={() => setCommentFormVisible(true)}
        >
          <FontAwesomeIcon icon={faPlusCircle} />
          Post a comment
        </button>
      )}
      {comments?.length > 0 ? (
        <ul className="flex flex-col gap-4 py-4">
          {comments.map((comment, index) => (
            <li key={index}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-4 text-slate-500">No comments</p>
      )}
    </div>
  );
}

function Comment({ comment }) {
  return (
    <div>
      <p>{comment.author.displayName}</p>
      <p className="text-slate-400">
        {new Date(comment.datePosted).toLocaleString()}
      </p>
      <p className="text-slate-500">{comment.content}</p>
    </div>
  );
}
