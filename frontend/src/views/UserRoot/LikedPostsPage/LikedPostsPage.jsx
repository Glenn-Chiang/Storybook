import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostsPageLayout from "../../../components/PostsPageLayout";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import postService from "../../../services/postService";
import PostsContext from "../../../contexts/PostsContext";

export default function LikedPostsPage() {
  const [posts, setPosts] = useState(useLoaderData());

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
    <PostsContext.Provider value={getPosts}>
      <PostsPageLayout
        posts={posts}
        sortBy={setSortBy}
        setSortOrder={setSortOrder}
        getPosts={getPosts}
      >
        <h1>
          <FontAwesomeIcon icon={faBookBookmark} />
          Liked Posts
        </h1>
      </PostsPageLayout>
    </PostsContext.Provider>
  );
}
