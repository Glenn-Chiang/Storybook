import userService from "../../../services/userService"

export const loader = async ({params}) => {
  const userId = params.userId
  try {
    const friends = await userService.getFriends(userId)
    return friends
  } catch (error) {
    console.log("Error getting user friends:", error)
    return null
  }
}
