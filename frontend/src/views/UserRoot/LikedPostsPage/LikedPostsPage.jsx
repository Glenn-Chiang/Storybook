import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../../../services/postService";
import { useQuery } from "react-query";
import PostsPage from "../../../components/Posts";

export default function LikedPostsPage() {
  const [sortBy, setSortBy] = useState("datePosted");
  const [sortOrder, setSortOrder] = useState("desc");

  const userId = useParams().userId;

  const {
    data: likedPosts,
    isLoading,
    isError,
  } = useQuery(["likedPosts", sortBy, sortOrder], () =>
    postService.getLikedByUser(userId, sortBy, sortOrder)
  );

  return (
    <main>
      <h1>
        <FontAwesomeIcon icon={faBookBookmark} />
        Liked Posts
      </h1>
      <PostsPage
        isLoading={isLoading}
        isError={isError}
        posts={likedPosts}
        sortBy={setSortBy}
        setSortOrder={setSortOrder}
      />
    </main>
  );
}
