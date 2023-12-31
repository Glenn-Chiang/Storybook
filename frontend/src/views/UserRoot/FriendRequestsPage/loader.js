import { redirect } from "react-router-dom";
import userService from "../../../services/userService";
import friendRequestService from "../../../services/friendRequestService";

const loader = async ({ params }) => {
  const userId = params.userId;
  try {
    const currentUser = userService.getCurrentUser();
    const authorized = currentUser && currentUser.userId === userId;
    if (!authorized) {
      return redirect(`/users/${userId}/addFriend`);
    }
    const received = await friendRequestService.get(userId, "received");
    const sent = await friendRequestService.get(userId, "sent");
    return { received, sent };
  } catch (error) {
    console.log("Error getting friend requests:", error);
    return [];
  }
};

export default loader;
