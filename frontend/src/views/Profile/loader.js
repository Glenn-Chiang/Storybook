import userService from "../../services/userService";

export const loader = async ({ params }) => {
  // const userId = 64c1bd4825678c815a14fe72
  const userId = params.userId;
  const user = await userService.getUser(userId);
  return user;
};
