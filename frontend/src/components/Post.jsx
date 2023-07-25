/* eslint-disable react/prop-types */
import {
  faArrowUp,
  faCalendarCheck,
  faCalendarPlus,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditButton, DeleteButton } from "./buttons";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

export default function Post({ post, setPosts }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const likePost = () => {
    const updatedPost = { ...post, likes: post.likes + 1 };
    return;
  };

  return (
    <div className="flex justify-between flex-col gap-4 shadow p-6 rounded-xl bg-white">
      <div className="flex gap-4 sm:flex-row flex-col">
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
          <p className="text-sky-900/75 w-full py-2 rounded ">{post.content}</p>
        </div>
        <div className="flex sm:flex-col-reverse justify-between items-end">
          <div className="flex sm:flex-col gap-2 text-xl">
            <LikeButton onClick={likePost} likeCount={10} />
            <CommentButton
              onClick={() => setCommentsVisible((prev) => !prev)}
              commentCount={5}
            />
          </div>
          <div className="flex sm:flex-col text-xl gap-2 justify-center">
            <EditButton onClick={() => setEditModalVisible(true)} />
            <DeleteButton onClick={() => setDeleteModalVisible(true)} />
          </div>
        </div>
      </div>

      {commentsVisible && <CommentSection comments={post.comments} />}

      {editModalVisible && (
        <EditModal
          post={post}
          closeModal={() => setEditModalVisible(false)}
          setPosts={setPosts}
        />
      )}
      {deleteModalVisible && (
        <DeleteModal
          post={post}
          closeModal={() => setDeleteModalVisible(false)}
          setPosts={setPosts}
        />
      )}
    </div>
  );
}

function CommentSection() {
  const comments = [
    {
      author: "Homelander",
      content: "God Bless America!",
    },
    {
      author: "The Deep",
      content: "I'm going to renew my light",
    },
  ];
  return (
    <div>
      <h2 className="py-4">Comments</h2>
      {comments?.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {comments.map((comment, index) => (
            <li key={index}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments</p>
      )}
    </div>
  );
}

function Comment({ comment }) {
  return (
    <div>
      <p>{comment.author}</p>
      <p className="text-slate-500">{comment.content}</p>
    </div>
  );
}

function LikeButton({ onClick, likeCount }) {
  return (
    <div className="flex sm:flex-row-reverse gap-1">
      <button
        onClick={onClick}
        className="text-white bg-sky-500 hover:bg-sky-600 w-8 h-8 rounded-xl"
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
