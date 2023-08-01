import { useRef, useState } from "react";
import Paginator from "../components/Paginator";
import PostsList from "../components/PostsList";
import TeleportButton from "../components/TeleportButton";
import PostsConfig from "../components/PostsConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountDesc } from "@fortawesome/free-solid-svg-icons";

/* eslint-disable react/prop-types */
export default function PostsPage({
  children,
  posts,
  setSortBy,
  setSortOrder,
  getPosts,
  readOnly,
}) {
  const [configIsVisible, setConfigIsVisible] = useState(false);

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

  const topRef = useRef();

  return (
    <div className="flex flex-col items-center">
      {children}

      {configIsVisible && (
        <PostsConfig
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
          setFilterBy={setFilterBy}
          handleFilterChange={handleFilterChange}
        />
      )}

      <section
        ref={topRef}
        className="flex items-center justify-center relative"
      >
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
