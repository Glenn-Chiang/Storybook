import userService from "../../../services/userService"

export const loader = async ({params}) => {
  const currentUser = userService.getCurrentUser()
  try {
    const requestsSentByCurrentUser = await userService.getFriendRequests(currentUser.userId, "sent")
    return ((requestsSentByCurrentUser.map(user => user.id)).includes(params.userId))
  } catch (error) {
    console.log("Error getting friend requests while loading AddFriendPage:", error)
    return null
  }
}