import commentService from "../../../services/commentService"

export const loader = async ({params}) => {
  const userId = params.userId
  try {
    const comments = await commentService.getByUser(userId)
    return comments
  } catch (error) {
    console.log("Error loading comments: ", error)
    return []
  }
}