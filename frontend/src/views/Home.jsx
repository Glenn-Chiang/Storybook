import { useEffect, useState, useCallback } from "react";
import postService from "../services/postService";
import Header from "../components/Header";

// import TeleportButton from "../components/TeleportButton";
import PostsPage from "./PostsPage";
// import { useLoaderData } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
export default function Home() {
  const [posts, setPosts] = useState([]);

  const sortFields = [
    { value: "datePosted", label: "Date posted" },
    { value: "lastUpdated", label: "Last updated" },
  ];
  const sortOrders = [
    { value: "desc", label: "newest" },
    { value: "asc", label: "oldest" },
  ];
  const [sortBy, setSortBy] = useState(sortFields[0].value);
  const [sortOrder, setSortOrder] = useState(sortOrders[0].value);

  const getPosts = useCallback(async () => {
    try {
      const posts = await postService.getAll(sortBy, sortOrder);
      setPosts(posts);
    } catch (error) {
      console.log("Error getting posts: ", error);
    }
  }, [sortBy, sortOrder]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <PostsPage
      posts={posts}
      setSortBy={setSortBy}
      setSortOrder={setSortOrder}
      getPosts={getPosts}
      readOnly={true}
    >
      <div className="flex flex-col items-center">
        <Header />
      </div>
    </PostsPage>
  );
}
