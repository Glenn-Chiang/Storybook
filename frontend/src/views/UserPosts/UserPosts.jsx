import { useEffect, useState, useCallback } from "react";
import userService from "../../services/userService";
import { Link, useParams } from "react-router-dom";
import CreatePostBox from "../../components/CreatePostBox";
import PostsPage from "../PostsPage";

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
export default function UserPosts() {
  const [posts, setPosts] = useState([]);

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


  return (
    <PostsPage
      posts={posts}
      setSortBy={setSortBy}
      setSortOrder={setSortOrder}
      getPosts={getPosts}
      readOnly={readOnly}
    >
      <div className="flex flex-col items-center">
        <h1 className="pb-10 text-4xl font-bold">
          {readOnly ? "Username's Posts" : "My Posts"}
        </h1>
        <Link to={`/users/${userId}/profile`} className="p-2 rounded-xl mb-10">
          View Profile
        </Link>
        {!readOnly && <CreatePostBox setPosts={getPosts} />}
      </div>
    </PostsPage>
  );
}
