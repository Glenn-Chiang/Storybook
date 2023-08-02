import { redirect } from "react-router-dom";
import userService from "../../services/userService";

export const loader = async () => {
  const currentUser = await userService.getCurrentUser();
  if (currentUser) {
    return redirect("/"); // If user is already logged in but tries to access /login or /register, redirect them to home page
  }
  return null;
};
