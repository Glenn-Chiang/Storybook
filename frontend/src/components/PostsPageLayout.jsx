import { useRef, useState } from "react";
import PostsList from "./PostsList";
import TeleportButton from "./TeleportButton";
import PostsConfig from "./PostsConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountDesc } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "./ErrorMessage";

/* eslint-disable react/prop-types */
export default function PostsPageLayout({
  isLoading,
  isError,
  posts,
  setSortBy,
  setSortOrder,
}) {
  const [configIsVisible, setConfigIsVisible] = useState(false);

  const [filterBy, setFilterBy] = useState("title");
  const [filterTerms, setFilterTerms] = useState("");

  const handleFilterChange = (event) => {
    setFilterTerms(event.target.value);
  };

  const displayedPosts = posts?.filter((post) =>
    post[filterBy].toLowerCase().includes(filterTerms.toLowerCase())
  );

  const topRef = useRef();

  return (
    <div className="flex flex-col items-center">
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
      {isLoading ? (<section>Loading posts...</section>) : isError ? (
      <section>
        <ErrorMessage>Error loading posts</ErrorMessage>
      </section> 
      ):
      displayedPosts.length === 0 ? (
        <section className="text-slate-400 text-center p-4">
          No posts found
        </section>
      ) : (
        <PostsList posts={displayedPosts} />
      )}
      <TeleportButton forwardedRef={topRef} />
    </div>
  );
}
