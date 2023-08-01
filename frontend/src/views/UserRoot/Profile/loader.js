import userService from "../../../services/userService";

export const loader = async ({ params }) => {
  const userId = params.userId;
  try {
    const user = await userService.getUser(userId);
    return user;
  } catch (error) {
    console.log('User not found')
    return null
  }
};
