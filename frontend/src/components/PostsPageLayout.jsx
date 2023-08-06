import { useRef, useState } from "react";
import PostsList from "./PostsList";
import TeleportButton from "./TeleportButton";
import PostsConfig from "./PostsConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountDesc } from "@fortawesome/free-solid-svg-icons";

/* eslint-disable react/prop-types */
export default function PostsPageLayout({
  children,
  posts,
  setSortBy,
  setSortOrder,
  getPosts,
}) {
  const [configIsVisible, setConfigIsVisible] = useState(false);

  const [filterBy, setFilterBy] = useState("title");
  const [filterTerms, setFilterTerms] = useState("");

  const handleFilterChange = (event) => {
    setFilterTerms(event.target.value);
  };

  const displayedPosts = posts.filter((post) =>
    post[filterBy].toLowerCase().includes(filterTerms.toLowerCase())
  );

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

      <button
        onClick={() => setConfigIsVisible((prev) => !prev)}
        className=""
        ref={topRef}
      >
        <FontAwesomeIcon icon={faSortAmountDesc} />
      </button>

      {displayedPosts.length === 0 ? (
        <section className="text-slate-400 text-center p-4">No posts found</section>
      ) : (
        <PostsList posts={displayedPosts} setPosts={getPosts} />
      )}

      <TeleportButton forwardedRef={topRef} />
    </div>
  );
}
