/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  faCalendarCheck,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useCallback } from "react";
import { EditButton, DeleteButton } from "./components/buttons";
import CreatePostBox from "./components/CreatePostBox";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";
import postService from "./services/postService";
import Header from "./components/Header";

export default function App() {
  const [posts, setPosts] = useState([]);

  const sortFields = [{ value: 'dateAdded', label: 'Date added' }, { value: 'lastUpdated', label: 'Last updated' }]
  const sortOrders = [{ value: 'desc', label: 'newest' }, { value: 'asc', label: 'oldest' }]
  const [sortBy, setSortBy] = useState(sortFields[0].value)
  const [sortOrder, setSortOrder] = useState(sortOrders[0].value)

  const getPosts = useCallback(async () => {
    try {
      const posts = await postService.getAll(sortBy, sortOrder)
      setPosts(posts);
    } catch (error) {
      console.log("Error getting posts: ", error);
    }
  }, [sortBy, sortOrder]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <CreatePostBox setPosts={getPosts} />
      <h1 className="p-8 text-center">My Posts</h1>
      <div className="flex gap-4 p-4">
        <Dropdown label={'Sort by'} options={sortFields} setOption={option => setSortBy(option)} />
        <Dropdown label={'Sort order'} options={sortOrders} setOption={option => setSortOrder(option)} />
      </div>
      <PostsList posts={posts} setPosts={getPosts} />
    </div>
  );
}

function Dropdown({ label, options, setOption }) {
  const handleChange = event => {
    setOption(event.target.value)
  }
  return (
    <div className="flex gap-2 ">
      <label htmlFor="sortDropdown">{label}</label>
      <select onChange={handleChange} id="sortDropdown" className="capitalize rounded">
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
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
      <ul className="flex flex-col gap-8 pt-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <Post post={post} setPosts={setPosts} />
            </li>
          ))
        ) : (
          <p className="text-slate-400 text-center p-4">You have not created any posts</p>
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
