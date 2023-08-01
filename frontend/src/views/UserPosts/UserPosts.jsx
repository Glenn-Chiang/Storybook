import { useEffect, useState, useCallback } from "react";
import userService from "../../services/userService";
import { useParams } from "react-router-dom";
import CreatePostBox from "../../components/CreatePostBox";
import PostsPage from "../PostsPage";
import postService from "../../services/postService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen} from "@fortawesome/free-solid-svg-icons";

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
    <PostsPage
      posts={posts}
      setSortBy={setSortBy}
      setSortOrder={setSortOrder}
      getPosts={getPosts}
      readOnly={readOnly}
    >
      <h1>
        <FontAwesomeIcon icon={faBookOpen}/>
        Posts
      </h1>
      {!readOnly && <CreatePostBox setPosts={getPosts} />}
    </PostsPage>
  );
}
