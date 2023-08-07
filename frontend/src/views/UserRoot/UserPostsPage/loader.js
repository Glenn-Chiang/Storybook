import postService from "../../../services/postService";

export const loader = async ({params}) => {
  const userId = params.userId
  try {
    const posts = await postService.getByUser(userId, "datePosted", "desc");
    return posts;
  } catch (error) {
    console.log("Error getting posts: ", error);
  }
}