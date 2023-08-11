import { useRef, useState } from "react";
import TeleportButton from "./TeleportButton";
import PostsConfig from "./PostsConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountDesc } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "./ErrorMessage";
import PostList from "./PostList";

/* eslint-disable react/prop-types */
export default function PostFeed({
  isLoading,
  isError,
  posts,
  handleDelete,
  handleLike,
  setSortOrder,
  setSortBy,
}) {
  const topRef = useRef();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterBy, setFilterBy] = useState("title");
  const [filterTerms, setFilterTerms] = useState("");
  const handleFilterChange = (event) => {
    setFilterTerms(event.target.value);
  };

  const displayedPosts = posts?.filter((post) =>
    post[filterBy].toLowerCase().includes(filterTerms.toLowerCase())
  );
  
  return (
    <div className="flex flex-col items-center">
      {filterVisible && (
        <PostsConfig
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
          setFilterBy={setFilterBy}
          handleFilterChange={handleFilterChange}
        />
      )}
      <button onClick={() => setFilterVisible((prev) => !prev)} ref={topRef}>
        <FontAwesomeIcon icon={faSortAmountDesc} />
      </button>

      {isLoading ? (
        <section>Loading posts...</section>
      ) : isError ? (
        <section>
          <ErrorMessage>Error loading posts</ErrorMessage>
        </section>
      ) : displayedPosts.length === 0 ? (
        <section className="text-slate-400 text-center p-4">
          No posts found
        </section>
      ) : (
        <PostList posts={displayedPosts} handleDelete={handleDelete} handleLike={handleLike}/>
      )}
      <TeleportButton forwardedRef={topRef} />
    </div>
  );
}
