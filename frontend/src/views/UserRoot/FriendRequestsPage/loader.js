import userService from "../../../services/userService";

const loader = async ({ params }) => {
  const userId = params.userId;
  try {
    const received = await userService.getFriendRequests(userId, "received");
    const sent = await userService.getFriendRequests(userId, "sent")
    return {received, sent};
  } catch (error) {
    console.log("Error getting friend requests:", error);
    return [];
  }
};

export default loader