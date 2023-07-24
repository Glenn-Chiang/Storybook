/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback, useRef } from "react";
import CreatePostBox from "./components/CreatePostBox";
import postService from "./services/postService";
import Header from "./components/Header";
import PostsList from "./components/PostsList";
import Dropdown from "./components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [posts, setPosts] = useState([]);

  const sortFields = [
    { value: "dateAdded", label: "Date posted" },
    { value: "lastUpdated", label: "Last updated" },
  ];
  const sortOrders = [
    { value: "desc", label: "newest" },
    { value: "asc", label: "oldest" },
  ];
  const [sortBy, setSortBy] = useState(sortFields[0].value);
  const [sortOrder, setSortOrder] = useState(sortOrders[0].value);

  const getPosts = useCallback(async () => {
    try {
      const posts = await postService.getAll(sortBy, sortOrder);
      setPosts(posts);
    } catch (error) {
      console.log("Error getting posts: ", error);
    }
  }, [sortBy, sortOrder]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const filterFields = [
    { label: "Title", value: "title" },
    { label: "Content", value: "content" },
  ];
  const [filterField, setFilterField] = useState(filterFields[0].value);
  const [filterTerms, setFilterTerms] = useState("");

  const filteredPosts = posts.filter((post) =>
    post[filterField].toLowerCase().includes(filterTerms.toLowerCase())
  );
  const displayedPosts = filterTerms ? filteredPosts : posts;

  const topRef = useRef(null);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <CreatePostBox setPosts={getPosts} />
      <h1 className="p-8 text-center" ref={topRef}>
        My Posts
      </h1>
      <div className="flex gap-4 p-4 flex-col sm:flex-row">
        <Dropdown
          label={"Sort by"}
          options={sortFields}
          setOption={(option) => setSortBy(option)}
        />
        <Dropdown
          label={"Sort order"}
          options={sortOrders}
          setOption={(option) => setSortOrder(option)}
        />
      </div>
      <div className="flex flex-col items-center sm:flex-row gap-4 p-4">
        <Dropdown
          label={"Filter by"}
          options={filterFields}
          setOption={(option) => setFilterField(option)}
        />
        <Filterbar setFilterTerms={setFilterTerms} />
      </div>

      {posts.length === 0 ? (
        <p className="text-slate-400 text-center p-4">
          You have not created any posts
        </p>
      ) : displayedPosts.length === 0 ? (
        <p className="text-slate-400 text-center p-4">No posts found</p>
      ) : (
        <PostsList posts={displayedPosts} setPosts={getPosts} />
      )}
      <TeleportButton forwardedRef={topRef} />
    </div>
  );
}

function TeleportButton({ forwardedRef }) {
  const handleClick = () => {
    forwardedRef.current.scrollIntoView();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-2 right-2 p-2 rounded-2xl w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white flex justify-center items-center group"
    >
      <FontAwesomeIcon icon={faArrowUp} />
      <p className="absolute -left-32 min-w-max p-2 rounded-xl hidden group-hover:block bg-sky-800">
        Go to Top Post
      </p>
    </button>
  );
}

function Filterbar({ setFilterTerms }) {
  const handleChange = (event) => {
    setFilterTerms(event.target.value);
  };
  return (
    <div className="">
      <input
        onChange={handleChange}
        className="rounded-xl p-2 shadow w-80 sm:w-96"
      />
    </div>
  );
}
