/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback, useRef } from "react";
import CreatePostBox from "../components/CreatePostBox";
import Header from "../components/Header";
import PostsList from "../components/PostsList";
import Dropdown from "../components/Dropdown";
import Paginator from "../components/Paginator";
import LoginLink from "../components/LoginLink";
import TeleportButton from '../components/TeleportButton'
import userService from "../services/userService";

export default function Home() {
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
    const userId = JSON.parse(localStorage.getItem('currentUser')).userId
    try {
      const posts = await userService.getPosts(userId, sortBy, sortOrder);
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

  const handleFilterChange = event => {
    setFilterTerms(event.target.value)
    setStartIndex(0)
  }

  const filteredPosts = posts.filter((post) =>
    post[filterField].toLowerCase().includes(filterTerms.toLowerCase())
  );

  const postsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const currentPage = Math.floor(startIndex / postsPerPage) + 1;
  const numPages = filteredPosts.length > 0 ?  Math.ceil(filteredPosts.length / postsPerPage) : 1;

  const handlePrev = () => {
    if (startIndex === 0) {
      return;
    }
    setStartIndex((prev) => prev - postsPerPage);
  };

  const handleNext = () => {
    if (startIndex + postsPerPage >= filteredPosts.length) {
      return;
    }
    setStartIndex((prev) => prev + postsPerPage);
  };

  const displayedPosts = filterTerms
    ? filteredPosts.slice(startIndex, startIndex + postsPerPage)
    : posts.slice(startIndex, startIndex + postsPerPage);

  const topRef = useRef(null);
  const scrollToTop = () => {
    topRef.current.scrollIntoView()
  }

  return (
    <div className="flex flex-col items-center">
      <Header />
      <LoginLink/>
      <CreatePostBox setPosts={getPosts} scrollToTop={scrollToTop}/>
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
        <Filterbar handleChange={handleFilterChange} />
      </div>

      <Paginator
        currentPage={currentPage}
        numPages={numPages}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      {posts.length === 0 ? (
        <p className="text-slate-400 text-center p-4">
          You have not created any posts
        </p>
      ) : displayedPosts.length === 0 ? (
        <p className="text-slate-400 text-center p-4">No posts found</p>
      ) : (
        <PostsList posts={displayedPosts} setPosts={getPosts} />
      )}

      <Paginator
        currentPage={currentPage}
        numPages={numPages}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      <TeleportButton forwardedRef={topRef} />
    </div>
  );
}


function Filterbar({handleChange }) {
  return (
    <div className="">
      <input
        onChange={handleChange}
        className="rounded-xl p-2 shadow w-80 sm:w-96 text-slate-500"
      />
    </div>
  );
}
