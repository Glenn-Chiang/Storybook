import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostsPage from "../PostsPage";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../../services/postService";

export default function LikedPostsPage() {
  const [posts, setPosts] = useState([]);

  const [sortBy, setSortBy] = useState("datePosted");
  const [sortOrder, setSortOrder] = useState("desc");

  const userId = useParams().userId;

  const getPosts = useCallback(async () => {
    try {
      const posts = await postService.getLikedByUser(userId, sortBy, sortOrder);
      setPosts(posts);
    } catch (error) {
      console.log("Error getting posts: ", error);
    }
  }, [userId, sortBy, sortOrder]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <PostsPage posts={posts} sortBy={setSortBy} setSortOrder={setSortOrder} getPosts={getPosts} readOnly={false}>
      <h1>
        <FontAwesomeIcon icon={faBookBookmark} />
        Liked Posts
      </h1>
    </PostsPage>
  );
}
