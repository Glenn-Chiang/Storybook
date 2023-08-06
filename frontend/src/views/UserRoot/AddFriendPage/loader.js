import friendRequestService from "../../../services/friendRequestService"
import userService from "../../../services/userService"

export const loader = async ({params}) => {
  const currentUser = userService.getCurrentUser()
  try {
    const sentRequest = await friendRequestService.getOne(currentUser.userId, params.userId)
    if (sentRequest) {
      return sentRequest.status // accepted, rejected or pending
    } else {
      return null
    }
  } catch (error) {
    console.log("Error getting friend requests while loading AddFriendPage:", error)
    return null
  }
}