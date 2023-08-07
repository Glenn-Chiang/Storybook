/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import PostsPageLayout from "../../../components/PostsPageLayout";
import postService from "../../../services/postService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import PostsContext from "../../../contexts/PostsContext";

export default function UserPostsPage() {
  const [posts, setPosts] = useState(useLoaderData());

  const [sortBy, setSortBy] = useState("datePosted");
  const [sortOrder, setSortOrder] = useState("desc");

  const userId = useParams().userId;

  const getPosts = useCallback(async () => {
    try {
      const posts = await postService.getByUser(userId, sortBy, sortOrder);
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
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
      >
        <h1>
          <FontAwesomeIcon icon={faBookOpen} />
          Posts
        </h1>
      </PostsPageLayout>
    </PostsContext.Provider>
  );
}
