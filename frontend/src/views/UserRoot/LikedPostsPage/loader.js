import { redirect } from "react-router-dom";
import userService from "../../../services/userService";

export const loader = async ({ params }) => {
  const userId = params.userId;
    const currentUser = userService.getCurrentUser();
    const authorized = currentUser && currentUser.userId === userId;
    if (!authorized) {
      return redirect(`/users/${userId}/posts`);
    }
    return null
};
