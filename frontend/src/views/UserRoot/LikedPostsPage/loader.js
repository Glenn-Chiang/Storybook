import { redirect } from "react-router-dom";
import userService from "../../../services/userService";
import postService from "../../../services/postService";

export const loader = async ({ params }) => {
  const userId = params.userId;
  try {
    const currentUser = userService.getCurrentUser();
    const authorized = currentUser && currentUser.userId === userId;
    if (!authorized) {
      return redirect(`/users/${userId}/posts`);
    }
    const posts = await postService.getLikedByUser(
      userId,
      "datePosted",
      "desc"
    );
    return posts;
  } catch (error) {
    console.log("Error getting posts: ", error);
    return [];
  }
};
