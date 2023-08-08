import { redirect } from "react-router-dom"
import userService from "../../../services/userService"

export const loader = async ({params}) => {
  const currentUser = userService.getCurrentUser()
  // If user is not logged in and tries to access a user's CreatePostPage, redirect to /login
  if (!currentUser) {
    return redirect('/login')
  }
  // If user tries to access CreatePostpage of another user, redirect to their own CreatePostPage
  if (currentUser.userId !== params.userId) {
    return redirect(`/users/${currentUser.userId}/createPost`)
  }
  return null
}