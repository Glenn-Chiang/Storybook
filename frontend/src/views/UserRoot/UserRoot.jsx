import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { ProfileLinks } from "../../components/ProfileLinks";
import userService from "../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";

export default function UserRoot() {
  const userId = useParams().userId;
  const user = useLoaderData();
  const currentUser = userService.getCurrentUser();
  const IsOwnProfile = currentUser.userId === userId;
  return (
    <>
      <h1 className="text-3xl">
        <FontAwesomeIcon icon={faUserCircle} />
        {user.displayName}
      </h1>
      <div className="flex justify-center gap-4">
        <ProfileLinks userId={userId} IsOwnProfile={IsOwnProfile} />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
