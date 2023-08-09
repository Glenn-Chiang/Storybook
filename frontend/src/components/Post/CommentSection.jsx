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
import NameLink from "../NameLink";
import PostsContext from "../../contexts/PostsContext";
import { useQuery } from "react-query";
import ErrorMessage from "../ErrorMessage";

export default function CommentSection({ postId }) {
  const {
    isLoading,
    isError,
    data: comments,
  } = useQuery(["comments", postId], () => commentService.getByPost(postId));

  const currentUser = userService.getCurrentUser();
  const post = useContext(PostContext);
  const [commentFormVisible, setCommentFormVisible] = useState(false);
  const updatePostsState = useContext(PostsContext);

  const handleSubmitComment = async (formData) => {
    const commentObject = {
      content: formData.content,
      datePosted: new Date(),
    };
    try {
      await commentService.create(post.id, commentObject);
      setCommentFormVisible(false);
      updatePostsState();
    } catch (error) {
      console.log("Error posting comment:", error);
    }
  };

  return (
    <div className="p-4 rounded-xl">
      <h2>Comments ({comments?.length})</h2>
      {commentFormVisible && (
        <CommentForm
          onSubmit={handleSubmitComment}
          closeForm={() => setCommentFormVisible(false)}
          defaultValue={""}
        />
      )}
      {currentUser && (
        <div className="pt-4">
          <button
            className="text-white bg-sky-500 hover:bg-sky-600 p-2 rounded-xl flex gap-2 items-center"
            onClick={() => setCommentFormVisible(true)}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
            Post a comment
          </button>
        </div>
      )}
      {isLoading ? (
        <p className="text-slate-400 py-4">Loading comments...</p>
      ) : isError ? (
        <ErrorMessage>Error loading comments</ErrorMessage>
      ) : (
        <CommentsList comments={comments} />
      )}
    </div>
  );
}

function CommentsList({ comments }) {
  return comments.length > 0 ? (
    <ul className="flex flex-col gap-4 py-4">
      {comments.map((comment, index) => (
        <li key={index}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-slate-400 py-4">No comments</p>
  );
}

function Comment({ comment }) {
  const currentUser = userService.getCurrentUser();
  const updatePostsState = useContext(PostsContext);

  const IsOwnComment = currentUser
    ? currentUser.userId === comment.author.id
    : false;

  const [commentFormVisible, setCommentFormVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const deleteComment = async () => {
    try {
      await commentService.remove(comment.id);
      updatePostsState();
      setDeleteModalVisible(false);
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

  const editComment = async (formData) => {
    try {
      await commentService.update(comment.id, formData.content);
      setCommentFormVisible(false);
      updatePostsState();
    } catch (error) {
      console.log("Error editing comment:", error);
    }
  };

  return (
    <article className="flex gap-8 justify-between">
      <div className="">
        <NameLink
          to={`/users/${comment.author.id}/profile`}
          name={comment.author.displayName}
          isSelf={IsOwnComment}
        />
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
            <EditButton
              onClick={() => setCommentFormVisible((prev) => !prev)}
            />
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
    </article>
  );
}
