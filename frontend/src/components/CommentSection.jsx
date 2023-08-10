/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import CommentForm from "./CommentForm";
import { useContext, useState } from "react";
import commentService from "../services/commentService";
import userService from "../services/userService";
import { DeleteButton, EditButton } from "./buttons";
import DeleteModal from "./DeleteModal";
import NameLink from "./NameLink";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ErrorMessage from "./ErrorMessage";
import { PostContext } from "../contexts/PostContext";
// import PostsContext from "../../contexts/PostsContext";

export default function CommentSection({ postId }) {
  const currentUser = userService.getCurrentUser();
  const [commentFormVisible, setCommentFormVisible] = useState(false);

  const {
    isLoading,
    isError,
    data: comments,
  } = useQuery(["comments", postId], () => commentService.getByPost(postId));

  const queryClient = useQueryClient();

  const createCommentMutation = useMutation(
    (commentData) => commentService.create(postId, commentData),
    {
      onMutate: () => setCommentFormVisible(false),
      onSuccess: () => {
        queryClient.invalidateQueries(["posts", postId]);
        queryClient.invalidateQueries(["comments", postId]);
      },
    }
  );

  const handleCreate = async (formData) => {
    createCommentMutation.mutate({
      content: formData.content,
      datePosted: new Date(),
    });
  };

  return (
    <section className="w-full">
      <div className="w-full p-4">
        {commentFormVisible && (
          <CommentForm
            onSubmit={handleCreate}
            closeForm={() => setCommentFormVisible(false)}
            defaultValue={""}
          />
        )}
        {(currentUser && !commentFormVisible) && (
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
      </div>
      {isLoading ? (
        <p className="text-slate-400 py-4">Loading comments...</p>
      ) : isError ? (
        <ErrorMessage>Error loading comments</ErrorMessage>
      ) : (
        <CommentsList comments={comments} />
      )}
    </section>
  );
}

function CommentsList({ comments }) {
  return comments.length > 0 ? (
    <ul className="flex flex-col gap-4 py-4 w-full p-4">
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
  const post = useContext(PostContext);

  const IsOwnComment = currentUser
    ? currentUser.userId === comment.author.id
    : false;

  const [commentFormVisible, setCommentFormVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(() => commentService.remove(comment.id), {
    onMutate: () => setDeleteModalVisible(false),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", post.id]);
      queryClient.invalidateQueries(["posts", post.id]);
    },
  });

  const editMutation = useMutation(
    (updateData) => commentService.update(comment.id, updateData),
    {
      onMutate: () => setCommentFormVisible(false),
      onSuccess: () => queryClient.invalidateQueries(["comments", post.id]),
    }
  );

  const editComment = async (formData) => {
    editMutation.mutate(formData.content);
  };

  return (
    <article className="flex gap-8 justify-between">
      <div className="w-full">
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
          onSubmit={deleteMutation.mutate}
        />
      )}
    </article>
  );
}
