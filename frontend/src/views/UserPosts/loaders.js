import postService from "../../services/postService";
import userService from "../../services/userService";

const allPostsLoader = async () => {
  try {
    const posts = await postService.getAll("datePosted", "newest");
    return posts;
  } catch (error) {
    console.log("Error loading posts: ", error);
    return [];
  }
};

const userPostsLoader = async ({ params }) => {
  const userId = params.userId;
  try {
    const posts = await userService.getPosts(userId);
    return posts;
  } catch (error) {
    console.log("Error loading user's posts: ", error);
    return [];
  }
};

export {allPostsLoader, userPostsLoader}
