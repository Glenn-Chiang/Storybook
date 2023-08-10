/* eslint-disable react/prop-types */
import {
  faArrowUp,
  faCalendarCheck,
  faCalendarPlus,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditButton, DeleteButton } from "./buttons";
import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import userService from "../services/userService";
import NameLink from "./NameLink";
import { Link } from "react-router-dom";

export default function Post({
  post,
  liked,
  likeCount,
  handleLike,
  showEdit,
  showDelete,
}) {
  const currentUser = userService.getCurrentUser();

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
                onClick={handleLike}
                likeCount={likeCount}
              />
              <CommentButton commentCount={post.comments.length} />
            </div>
            <div className="flex text-xl gap-2 justify-center">
              {IsOwnPost && (
                <>
                  <EditButton onClick={showEdit} />
                  <DeleteButton onClick={showDelete} />
                </>
              )}
            </div>
          </div>
        </div>
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

function CommentButton({ commentCount }) {
  const postId = useContext(PostContext).id;
  return (
    <div className="flex sm:flex-row-reverse gap-1">
      <Link
        to={`/posts/${postId}`}
        className="flex items-center justify-center text-white bg-sky-500 hover:bg-sky-600 w-8 h-8 rounded-xl"
      >
        <FontAwesomeIcon icon={faComment} />
      </Link>
      <span>{commentCount}</span>
    </div>
  );
}
