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
import { useMutation, useQuery, useQueryClient } from "react-query";
import ErrorMessage from "../ErrorMessage";

export default function Post({ postId, flashAlert }) {
  const currentUser = userService.getCurrentUser();
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery(["posts", postId], () => postService.getById(postId), {
    onSuccess: (data) => {
      setLikeCount(data.likedBy.length);
      setLiked(data.likedBy.includes(data.author?.id));
    },
  });

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const likeMutation = useMutation(() => postService.like(post?.id), {
    onMutate: () => { // Optimistic update
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    },
    onError: (error) => {
      setLiked((prev) => !prev)
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
      flashAlert(`Error liking post: ${error.message}`, "error");
    },
    onSuccess: () => queryClient.invalidateQueries(["posts", postId]),
  });

  const editMutation = useMutation(
    (updateData) => postService.edit(post.id, updateData),
    {
      onMutate: () => {
        setEditModalVisible(false);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["posts", postId]); // Only refetch for this post
        flashAlert("Changes saved!", "success");
      },
      onError: (error) => {
        flashAlert(`Error editing post: ${error.message}`, "error");
      },
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
    onMutate: () => {
      setDeleteModalVisible(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      flashAlert("Post deleted!", "success");
    },
    onError: (error) => {
      flashAlert(`Error deleting post: ${error.message}`, "error");
    },
  });

  if (isLoading) {
    return <section>Loading post...</section>;
  }

  if (isError) {
    return (
      <section>
        <ErrorMessage>Error loading post</ErrorMessage>
      </section>
    );
  }

  const IsOwnPost = currentUser && currentUser.userId === post.author?.id;

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
        {commentsVisible && <CommentSection postId={post.id} />}
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
