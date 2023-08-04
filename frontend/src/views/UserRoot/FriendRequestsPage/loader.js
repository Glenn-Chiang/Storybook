import userService from "../../../services/userService";

const loader = async ({ params }) => {
  const userId = params.userId;
  try {
    const friendRequests = userService.getFriendRequests(userId);
    return friendRequests;
  } catch (error) {
    console.log("Error getting friend requests:", error);
    return [];
  }
};

export default loader