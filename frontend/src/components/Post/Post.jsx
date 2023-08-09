/* eslint-disable react/prop-types */
import {
  faArrowUp,
  faCalendarCheck,
  faCalendarPlus,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditButton, DeleteButton } from "../buttons";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";
import { useState } from "react";
import CommentSection from "./CommentSection";
import { PostContext } from "./PostContext";
import postService from "../../services/postService";
import userService from "../../services/userService";
import NameLink from "../NameLink";
import { useMutation, useQueryClient } from "react-query";

export default function Post({ post, flashAlert }) {
  const currentUser = userService.getCurrentUser();
  const IsOwnPost = currentUser && currentUser.userId === post.author?.id;

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [liked, setLiked] = useState(
    currentUser && post.likedBy.includes(currentUser.userId)
  );
  const [likeCount, setLikeCount] = useState(post.likedBy.length);

  const queryClient = useQueryClient();

  const likeMutation = useMutation(() => postService.like(post.id),
  {
    onSuccess: () => {
    },
    onMutate: () => {
      // TODO: Optimistic update
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    },
    onError: (error) => {
      flashAlert(`Error liking post: ${error.message}`, "error")
    }
  });

  const editMutation = useMutation(
    (updateData) => postService.edit(post.id, updateData),
    {
      onSuccess: () => {
        setEditModalVisible(false);
        queryClient.invalidateQueries("posts"); // Refetch updated data
        flashAlert("Changes saved!", "success");
      },
      onError: (error) => {
        flashAlert(`Error editing post: ${error.message}`, "error")
      }
    }
  );

  const handleEdit = (formData) => {
    editMutation.mutate({
      title: formData.title,
      content: formData.content,
      lastUpdated: new Date(),
    });
  };

  const deleteMutation = useMutation(() => postService.deletePost(post.id), {
    onSuccess: () => {
      setDeleteModalVisible(false);
      queryClient.invalidateQueries("posts")
      flashAlert("Post deleted!", "success");
    },
    onError: (error) => {
      flashAlert(`Error deleting post: ${error.message}`, "error")
    }
  })

  return (
    <PostContext.Provider value={post}>
      <div className="flex justify-between flex-col gap-4 shadow p-6 rounded-xl bg-white">
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col items-start gap-2 w-full">
            <h2>{post.title}</h2>
            <p className="text-sky-500 flex gap-2">
              <NameLink
                to={`/users/${post.author?.id}/profile`}
                name={post.author ? post.author.displayName : "Guest user"}
                isSelf={IsOwnPost}
              />
            </p>
            <p className="flex gap-4">
              <span className="flex gap-2 items-center text-slate-400">
                <FontAwesomeIcon icon={faCalendarPlus} />
                Date posted
              </span>
              <span className="text-slate-400">{post.datePosted}</span>
            </p>
            <p className="flex gap-4">
              <span className="flex gap-2 items-center text-slate-400">
                <FontAwesomeIcon icon={faCalendarCheck} />
                Last updated
              </span>
              <span className="text-slate-400">{post.lastUpdated}</span>
            </p>
            <p className="text-sky-900/75 w-full py-2 rounded ">
              {post.content}
            </p>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-2 text-xl">
              <LikeButton
                liked={liked}
                onClick={likeMutation.mutate}
                likeCount={likeCount}
              />
              <CommentButton
                onClick={() => setCommentsVisible((prev) => !prev)}
                commentCount={post.comments.length}
              />
            </div>
            <div className="flex text-xl gap-2 justify-center">
              {IsOwnPost && (
                <>
                  <EditButton onClick={() => setEditModalVisible(true)} />
                  <DeleteButton onClick={() => setDeleteModalVisible(true)} />
                </>
              )}
            </div>
          </div>
        </div>
        {commentsVisible && <CommentSection comments={post.comments} />}
        {editModalVisible && (
          <EditModal
            closeModal={() => setEditModalVisible(false)}
            handleSubmit={handleEdit}
          />
        )}
        {deleteModalVisible && (
          <DeleteModal
            closeModal={() => setDeleteModalVisible(false)}
            onSubmit={deleteMutation.mutate}
            resourceType={"post"}
          />
        )}
      </div>
    </PostContext.Provider>
  );
}

function LikeButton({ liked, onClick, likeCount }) {
  const currentUser = userService.getCurrentUser();
  return (
    <div className="flex sm:flex-row-reverse gap-1">
      <button
        disabled={!currentUser}
        onClick={onClick}
        className={`text-white transition-none disabled:bg-sky-500/50 ${
          liked
            ? "bg-teal-400 hover:bg-teal-500 "
            : "bg-sky-500 hover:bg-sky-600"
        } w-8 h-8 rounded-xl`}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      <span className={`${liked && "text-teal-400"}`}>{likeCount}</span>
    </div>
  );
}

function CommentButton({ onClick, commentCount }) {
  return (
    <div className="flex sm:flex-row-reverse gap-1">
      <button
        onClick={onClick}
        className="text-white bg-sky-500 hover:bg-sky-600 w-8 h-8 rounded-xl"
      >
        <FontAwesomeIcon icon={faComment} />
      </button>
      <span>{commentCount}</span>
    </div>
  );
}
