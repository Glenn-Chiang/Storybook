/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  faBookReader,
  faCalendarCheck,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { EditButton, DeleteButton } from "./components/buttons";
import AddPostBox from "./components/AddPostBox";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";

export default function App() {
  const posts = [
    {
      id: 1,
      title: "Post 1",
      content: "some content",
      dateAdded: new Date(),
      lastUpdated: new Date(),
    },
    {
      id: 2,
      title: "Post 2",
      content: "some other content",
      dateAdded: new Date(),
      lastUpdated: new Date(),
    },
    {
      id: 3,
      title: "Post 3",
      content: "some other content",
      dateAdded: new Date(),
      lastUpdated: new Date(),
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <Header />
      <AddPostBox />
      <h1 className="p-4 text-center">My Posts</h1>
      <PostsList posts={posts} />
    </div>
  );
}

function Header() {
  return (
    <h1 className="text-4xl font-bold p-8 flex gap-4 items-center bg-sky-100 w-screen justify-center">
      <FontAwesomeIcon icon={faBookReader} />
      StoryBook
    </h1>
  );
}

function PostsList({ posts }) {
  return (
    <section className="p-4 rounded-xl shadow">
      <ul className="p-4 flex flex-col gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <Post post={post} />
            </li>
          ))
        ) : (
          <p className="text-slate-400">You have not added any posts</p>
        )}
      </ul>
    </section>
  );
}

function Post({ post }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <div className="flex justify-between flex-col sm:flex-row gap-4">
      <div className="flex flex-col items-start gap-2">
        <h2>{post.title}</h2>
        <p className="flex gap-4">
          <span className="flex gap-2 items-center text-slate-400">
            <FontAwesomeIcon icon={faCalendarPlus} />
            Date added
          </span>
          <span className="text-slate-400">
            {post.dateAdded.toLocaleString()}
          </span>
        </p>
        <p className="flex gap-4">
          <span className="flex gap-2 items-center text-slate-400">
            <FontAwesomeIcon icon={faCalendarCheck} />
            Last updated{" "}
          </span>
          <span className="text-slate-400">
            {post.lastUpdated.toLocaleString()}
          </span>
        </p>
        <p className="text-sky-600 p-2">{post.content}</p>
      </div>
      <div className="flex sm:flex-col text-2xl gap-2 justify-center">
        <EditButton onClick={() => setEditModalVisible(true)} />
        <DeleteButton onClick={() => setDeleteModalVisible(true)} />
      </div>
      {editModalVisible && (
        <EditModal post={post} closeModal={() => setEditModalVisible(false)} />
      )}
      {deleteModalVisible && (
        <DeleteModal
          post={post}
          closeModal={() => setDeleteModalVisible(false)}
        />
      )}
    </div>
  );
}
