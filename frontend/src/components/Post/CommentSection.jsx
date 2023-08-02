/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import CommentForm from "../CommentForm";
import { useContext, useState } from "react";
import commentService from "../../services/commentService";
import userService from "../../services/userService";
import { PostContext } from "./PostContext";
import { DeleteButton, EditButton } from "../buttons";
import DeleteModal from "../DeleteModal";

export default function CommentSection({ comments, setPosts }) {
  const post = useContext(PostContext);
  const [commentFormVisible, setCommentFormVisible] = useState(false);

  const handleSubmitComment = async (formData) => {
    const commentObject = {
      content: formData.content,
      datePosted: new Date(),
    };
    try {
      await commentService.create(post.id, commentObject);
      setCommentFormVisible(false);
      setPosts();
    } catch (error) {
      console.log("Error posting comment:", error);
    }
  };

  return (
    <div className="p-4 rounded-xl">
      <h2 className="py-4">Comments ({comments.length})</h2>
      {commentFormVisible ? (
        <CommentForm
          onSubmit={handleSubmitComment}
          closeForm={() => setCommentFormVisible(false)}
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
              <Comment comment={comment} loadComments={setPosts} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-4 text-slate-500">No comments</p>
      )}
    </div>
  );
}

function Comment({ comment, loadComments }) {
  const IsOwnComment =
    userService.getCurrentUser().userId === comment.author.id;

  const [commentFormVisible, setCommentFormVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const deleteComment = async () => {
    try {
      await commentService.remove(comment.id);
      loadComments();
      setDeleteModalVisible(false);
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

  const editComment = async (formData) => {
    try {
      await commentService.update(comment.id, formData.content);
      setCommentFormVisible(false);
      loadComments();
    } catch (error) {
      console.log("Error editing comment:", error);
    }
  };

  return (
    <div className="flex gap-8 ">
      <div>
        <p>{comment.author.displayName}</p>
        <p className="text-slate-400">
          {new Date(comment.datePosted).toLocaleString()}
        </p>
        {commentFormVisible ? (
          <CommentForm
            onSubmit={editComment}
            closeForm={() => setCommentFormVisible(false)}
            defaultValue={comment.content}
          />
        ) : (
          <p className="text-slate-500 text-md py-2">{comment.content}</p>
        )}
      </div>
      <div>
        {IsOwnComment && (
          <div className="flex flex-col gap-2 justify-start py-2">
            <EditButton onClick={() => setCommentFormVisible(prev => !prev)} />
            <DeleteButton onClick={() => setDeleteModalVisible(true)} />
          </div>
        )}
      </div>

      {deleteModalVisible && (
        <DeleteModal
          closeModal={() => setDeleteModalVisible(false)}
          resourceType={"comment"}
          onSubmit={deleteComment}
        />
      )}
    </div>
  );
}
