import { useEffect, useState, useCallback, useRef } from "react";
import PostsList from "../../components/PostsList";
import Paginator from "../../components/Paginator";
import TeleportButton from "../../components/TeleportButton";
import userService from "../../services/userService";
import { useParams } from "react-router-dom";
import CreatePostBox from "../../components/CreatePostBox";
import PostsConfig from "../../components/PostsConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountDesc } from "@fortawesome/free-solid-svg-icons";
// import { useLoaderData } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
export default function UserPosts() {
  const [posts, setPosts] = useState([]);

  const [configIsVisible, setConfigIsVisible] = useState(false);

  const [sortBy, setSortBy] = useState("datePosted");
  const [sortOrder, setSortOrder] = useState("desc");

  const userId = useParams().userId;
  const currentUser = userService.getCurrentUser();
  const readOnly = currentUser.userId !== userId;

  const getPosts = useCallback(async () => {
    try {
      const posts = await userService.getPosts(userId, sortBy, sortOrder);
      setPosts(posts);
    } catch (error) {
      console.log("Error getting posts: ", error);
    }
  }, [userId, sortBy, sortOrder]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [filterBy, setFilterBy] = useState("title");
  const [filterTerms, setFilterTerms] = useState("");

  const handleFilterChange = (event) => {
    setFilterTerms(event.target.value);
    setStartIndex(0);
  };

  const filteredPosts = posts.filter((post) =>
    post[filterBy].toLowerCase().includes(filterTerms.toLowerCase())
  );

  const postsPerPage = 10;
  const [startIndex, setStartIndex] = useState(0);
  const currentPage = Math.floor(startIndex / postsPerPage) + 1;
  const numPages =
    filteredPosts.length > 0
      ? Math.ceil(filteredPosts.length / postsPerPage)
      : 1;

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
    topRef.current.scrollIntoView();
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="pb-10 text-4xl font-bold">
        {readOnly ? "Username's Posts" : "My Posts"}
      </h1>
      {!readOnly && (
        <CreatePostBox setPosts={getPosts} scrollToTop={scrollToTop} />
      )}

      {configIsVisible && (
        <PostsConfig
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
          setFilterBy={setFilterBy}
          handleFilterChange={handleFilterChange}
        />
      )}

      <section className="flex items-center justify-center relative" ref={topRef}>
        <button
          onClick={() => setConfigIsVisible((prev) => !prev)}
          className="absolute left-0"
        >
          <FontAwesomeIcon icon={faSortAmountDesc} />
        </button>
        <div className="">
          <Paginator
            currentPage={currentPage}
            numPages={numPages}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </div>
      </section>

      {posts.length === 0 ? (
        <p className="text-slate-400 text-center p-4">No posts created</p>
      ) : displayedPosts.length === 0 ? (
        <p className="text-slate-400 text-center p-4">No posts found</p>
      ) : (
        <PostsList
          posts={displayedPosts}
          setPosts={getPosts}
          readOnly={readOnly}
        />
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
