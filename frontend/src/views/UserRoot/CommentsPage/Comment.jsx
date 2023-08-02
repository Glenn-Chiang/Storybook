import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import {EditButton, DeleteButton} from "../../../components/buttons"

/* eslint-disable react/prop-types */
export default function Comment({ comment }) {
  const IsOwnComment = useContext(AuthContext)
  return (
    <article className="bg-white p-4 rounded-xl">
      <p>
        {comment.author.displayName} <span className="text-slate-500">commented on</span> {comment.post?.title}
      </p>
      <p className="text-slate-400">
        {new Date(comment.datePosted).toLocaleString()}
      </p>
      <p className="text-slate-500 text-md py-2">{comment.content}</p>
      {IsOwnComment && <div>
        <EditButton/>
        <DeleteButton/>
      </div>}
    </article>
  );
}
