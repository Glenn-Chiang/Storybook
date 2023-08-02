/* eslint-disable react/prop-types */
import {
  faArrowUp,
  faCalendarCheck,
  faCalendarPlus,
  faComment,
  faUserCircle,
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
import { Link } from "react-router-dom";

export default function Post({ post, setPosts }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const currentUser = userService.getCurrentUser();
  const IsOwnPost = currentUser.userId === post.author?.id;

  const likePost = async () => {
    try {
      await postService.like(post.id);
      setPosts();
    } catch (error) {
      console.log("Error liking post: ", error);
    }
  };

  const deletePost = async () => {
    try {
      await postService.deletePost(post.id);
      setPosts();
    } catch (error) {
      console.log("Error deleting post: ", error);
    }
    setDeleteModalVisible(false);
  };

  return (
    <PostContext.Provider value={post}>
      <div className="flex justify-between flex-col gap-4 shadow p-6 rounded-xl bg-white">
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col items-start gap-2 w-full">
            <h2>{post.title}</h2>
            <p className="text-sky-500 flex gap-2">
              <Link to={`/users/${post.author?.id}/profile`} className="flex gap-2 items-center hover:underline underline-offset-4">
                <FontAwesomeIcon icon={faUserCircle} />
                {post.author ? post.author.displayName : "Anonymous"}
              </Link>
              {IsOwnPost && <span className="text-slate-400">{"(You)"}</span>}
            </p>
            <p className="flex gap-4">
              <span className="flex gap-2 items-center text-slate-400">
                <FontAwesomeIcon icon={faCalendarPlus} />
                Date posted
              </span>
              <span className="text-slate-400">
                {new Date(post.datePosted).toLocaleString()}
              </span>
            </p>
            <p className="flex gap-4">
              <span className="flex gap-2 items-center text-slate-400">
                <FontAwesomeIcon icon={faCalendarCheck} />
                Last updated
              </span>
              <span className="text-slate-400">
                {new Date(post.lastUpdated).toLocaleString()}
              </span>
            </p>
            <p className="text-sky-900/75 w-full py-2 rounded ">
              {post.content}
            </p>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-2 text-xl">
              <LikeButton
                liked={post.likedBy.includes(currentUser.userId)}
                onClick={likePost}
                likeCount={post.likedBy.length}
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
        {commentsVisible && (
          <CommentSection comments={post.comments} setPosts={setPosts} />
        )}
        {editModalVisible && (
          <EditModal
            closeModal={() => setEditModalVisible(false)}
            setPosts={setPosts}
          />
        )}
        {deleteModalVisible && (
          <DeleteModal
            closeModal={() => setDeleteModalVisible(false)}
            onSubmit={deletePost}
            resourceType={"post"}
          />
        )}
      </div>
    </PostContext.Provider>
  );
}

function LikeButton({ liked, onClick, likeCount }) {
  return (
    <div className="flex sm:flex-row-reverse gap-1">
      <button
        onClick={onClick}
        className={`text-white ${
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
