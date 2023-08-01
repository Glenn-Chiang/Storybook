import { Outlet, useParams } from "react-router-dom";
import { ProfileLinks } from "../components/ProfileLinks";
import userService from "../services/userService";

export default function UserRoot() {
  const userId = useParams().userId;
  const currentUser = userService.getCurrentUser();
  const IsOwnProfile = currentUser.userId === userId;
  return (
    <>
      <div className="flex justify-center gap-4">
        <ProfileLinks userId={userId} IsOwnProfile={IsOwnProfile}/>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
