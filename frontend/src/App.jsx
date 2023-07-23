/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  faBookReader,
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

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await postService.getAll()
        setPosts(posts);
      } catch (error) {
        console.log("Error getting posts: ", error);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <CreatePostBox setPosts={setPosts} />
      <h1 className="p-8 text-center">My Posts</h1>
      <PostsList posts={posts} setPosts={setPosts} />
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
    <div className="flex justify-between flex-col sm:flex-row gap-4 shadow p-4 rounded-xl bg-white">
      <div className="flex flex-col items-start gap-2 w-full">
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
            Last updated
          </span>
          <span className="text-slate-400">
            {post.lastUpdated.toLocaleString()}
          </span>
        </p>

        <p className="text-sky-600 w-full p-2 rounded ">{post.content}</p>

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
