import userService from "../../services/userService"

export const loader = async () => {
  try {
    const users = await userService.getAll()
    return users
  } catch (error) {
    console.log("Error getting users:", error)
    return []
  }
}