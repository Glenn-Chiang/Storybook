import { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import CreatePostBox from "../../components/CreatePostBox";
import PostsPage from "../PostsPage";
import postService from "../../services/postService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "./AuthContext";

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
export default function UserPostsPage() {
  const [posts, setPosts] = useState([]);

  const [sortBy, setSortBy] = useState("datePosted");
  const [sortOrder, setSortOrder] = useState("desc");

  const userId = useParams().userId;
  const IsOwnPosts = useContext(AuthContext)

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
    >
      <h1>
        <FontAwesomeIcon icon={faBookOpen}/>
        Posts
      </h1>
      {IsOwnPosts && <CreatePostBox setPosts={getPosts} />}
    </PostsPage>
  );
}
