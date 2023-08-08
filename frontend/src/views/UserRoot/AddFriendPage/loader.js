import { redirect } from "react-router-dom"
import friendRequestService from "../../../services/friendRequestService"
import userService from "../../../services/userService"

export const loader = async ({params}) => {
  const currentUser = userService.getCurrentUser()
  // If guest user tries to access AddFriendPage
  if (!currentUser) {
    return redirect("/login")
  }

  // If user tries to access own AddFriendPage, redirect to their friend requests page
  if (currentUser?.userId === params.userId) {
    return redirect(`/users/${currentUser.userId}/friendRequests`)
  }

  try {
    const friend = await userService.getFriend(currentUser.userId, params.userId)
    if (friend) {
      return "alreadyFriends"
    }
    const sentRequest = await friendRequestService.getOne(currentUser.userId, params.userId)
    if (sentRequest) {
      return sentRequest.status // accepted, rejected or pending
    } else {
      return null
    }
  } catch (error) {
    console.log("Error loading AddFriendPage:", error)
    return null
  }
}