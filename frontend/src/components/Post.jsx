/* eslint-disable react/prop-types */
import {
  faCalendarCheck,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditButton, DeleteButton } from "./buttons";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

export default function Post({ post, setPosts }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <div className="flex justify-between flex-col sm:flex-row gap-4 shadow p-6 rounded-xl bg-white">
      <div className="flex flex-col items-start gap-2 w-full">
        <h2 >{post.title}</h2>
        <p className="flex gap-4">
          <span className="flex gap-2 items-center text-slate-400">
            <FontAwesomeIcon icon={faCalendarPlus} />
            Date added
          </span>
          <span className="text-slate-400">
            {(new Date(post.dateAdded)).toLocaleString()}
          </span>
        </p>
        <p className="flex gap-4">
          <span className="flex gap-2 items-center text-slate-400">
            <FontAwesomeIcon icon={faCalendarCheck} />
            Last updated
          </span>
          <span className="text-slate-400">
            {(new Date(post.lastUpdated)).toLocaleString()}
          </span>
        </p>

        <p className="text-sky-900/75 w-full py-2 rounded ">{post.content}</p>

      </div>
      <div className="flex sm:flex-col text-2xl gap-2 justify-center">
        <EditButton onClick={() => setEditModalVisible(true)} />
        <DeleteButton onClick={() => setDeleteModalVisible(true)} />
      </div>
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
