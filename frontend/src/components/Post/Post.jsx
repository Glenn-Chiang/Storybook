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
import postService from "../../services/postService";
import CommentSection from "./CommentSection";
import { PostContext } from "./PostContext";

export default function Post({ post, setPosts, readOnly }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const likePost = async () => {
    const updatedPost = { ...post, likes: post.likes + 1 };
    try {
      await postService.update(post.id, updatedPost);
      setPosts();
    } catch (error) {
      console.log("Error liking post: ", error);
    }
  };

  return (
    <PostContext.Provider value={post}>
      <div className="flex justify-between flex-col gap-4 shadow p-6 rounded-xl bg-white">
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col items-start gap-2 w-full">
            <h2>{post.title}</h2>
            <p className="flex gap-4">
              <span className="flex gap-2 items-center text-slate-400">
                <FontAwesomeIcon icon={faCalendarPlus} />
                Date posted
              </span>
              <span className="text-slate-400">
                {new Date(post.dateAdded).toLocaleString()}
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
              <LikeButton onClick={likePost} likeCount={10} />
              <CommentButton
                onClick={() => setCommentsVisible((prev) => !prev)}
                commentCount={5}
              />
            </div>
            <div className="flex text-xl gap-2 justify-center">
              {!readOnly && (
                <>
                  <EditButton onClick={() => setEditModalVisible(true)} />
                  <DeleteButton onClick={() => setDeleteModalVisible(true)} />
                </>
              )}
            </div>
          </div>
        </div>
        {commentsVisible && <CommentSection />}
        {editModalVisible && (
          <EditModal
            closeModal={() => setEditModalVisible(false)}
            setPosts={setPosts}
          />
        )}
        {deleteModalVisible && (
          <DeleteModal
            closeModal={() => setDeleteModalVisible(false)}
            setPosts={setPosts}
          />
        )}
      </div>
    </PostContext.Provider>
  );
}

function LikeButton({ onClick, likeCount }) {
  return (
    <div className="flex sm:flex-row-reverse gap-1">
      <button
        onClick={onClick}
        className="text-white bg-sky-500 hover:bg-teal-400 w-8 h-8 rounded-xl"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      <span>{likeCount}</span>
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
