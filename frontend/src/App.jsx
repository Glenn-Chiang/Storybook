/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  faCalendarCheck,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { EditButton, DeleteButton } from "./components/buttons";
import CreatePostBox from "./components/CreatePostBox";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";
import postService from "./services/postService";
import Header from "./components/Header";

export default function App() {
  const [posts, setPosts] = useState([]);

  const sortOrders = ['newest', 'oldest']
  const [sortOrder, setSortOrder] = useState(sortOrders[0])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await postService.getAll(sortOrder)
        setPosts(posts);
      } catch (error) {
        console.log("Error getting posts: ", error);
      }
    };
    getPosts();
  }, [sortOrder]);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <CreatePostBox setPosts={setPosts} />
      <h1 className="p-8 text-center">My Posts</h1>
      <Dropdown options={sortOrders} setOption={option => setSortOrder(option)} />
      <PostsList posts={posts} setPosts={setPosts} />
    </div>
  );
}

function Dropdown({ options, setOption }) {
  const handleChange = event => {
    setOption(event.target.value)
  }
  return (
    <div className="flex gap-2 ">
      <label htmlFor="sortDropdown">Sort by</label>
      <select onChange={handleChange} id="sortDropdown" className="capitalize">
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          )
        })}
      </select>
    </div>
  )
}

function PostsList({ posts, setPosts }) {
  return (
    <section className="">
      <ul className="flex flex-col gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <Post post={post} setPosts={setPosts} />
            </li>
          ))
        ) : (
          <p className="text-slate-400 text-center">You have not created any posts</p>
        )}
      </ul>
    </section>
  );
}

function Post({ post, setPosts }) {
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
