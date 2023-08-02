import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import { EditButton, DeleteButton } from "../../../components/buttons";
import DeleteModal from "../../../components/DeleteModal";
import commentService from "../../../services/commentService";
import CommentForm from "../../../components/CommentForm";

/* eslint-disable react/prop-types */
export default function Comment({ comment, loadComments }) {
  const IsOwnComment = useContext(AuthContext);

  const [commentFormVisible, setCommentFormVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const deleteComment = async () => {
    try {
      await commentService.remove(comment.id);
      loadComments();
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

  return (
    <article className="bg-white p-4 rounded-xl">
      <p>
        {comment.author.displayName}{" "}
        <span className="text-slate-500">commented on</span>{" "}
        <span className="hover:underline">{comment.post?.title}</span>
      </p>
      <p className="text-slate-400">
        {new Date(comment.datePosted).toLocaleString()}
      </p>

      {commentFormVisible ? (
        <CommentForm closeForm={() => setCommentFormVisible(false)} reload={loadComments} defaultValue={comment.content}/>
      ) : (
        <p className="text-slate-500 text-md py-2">{comment.content}</p>
      )}

      {IsOwnComment && (
        <div className="flex gap-2 justify-start py-2">
          <EditButton onClick={() => setCommentFormVisible(true)} />
          <DeleteButton onClick={() => setDeleteModalVisible(true)} />
        </div>
      )}

      {deleteModalVisible && (
        <DeleteModal
          closeModal={() => setDeleteModalVisible(false)}
          resourceType={"comment"}
          onSubmit={deleteComment}
        />
      )}
    </article>
  );
}
