/* eslint-disable react/prop-types */
import { Outlet, useLoaderData } from "react-router-dom";
import userService from "../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faBookBookmark,
  faBookOpen,
  faComment,
  faUserFriends,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { LinkButton } from "../../components/LinkButton";
import UserContext from './UserContext'

export default function UserRoot() {
  const user = useLoaderData();
  const currentUser = userService.getCurrentUser();
  const IsOwnProfile = currentUser ? currentUser.userId === user.userId : false;

  return (
    <UserContext.Provider value={user}>
      <h1 className="text-3xl">
        <FontAwesomeIcon icon={faUserCircle} />
        {user.displayName}
      </h1>
      <div className="flex justify-center gap-4">
        <ProfileLinks userId={user.userId} IsOwnProfile={IsOwnProfile} />
      </div>
      <div>
        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export function ProfileLinks({ IsOwnProfile }) {
  return (
    <div className="grid sm:grid-cols-5 grid-cols-2 gap-4">
      <LinkButton route={"profile"}>
        <FontAwesomeIcon icon={faUserCircle} />
        Profile
      </LinkButton>
      <LinkButton route={"posts"}>
        <FontAwesomeIcon icon={faBookOpen} />
        Posts
      </LinkButton>
      <LinkButton route={"comments"}>
        <FontAwesomeIcon icon={faComment} />
        Comments
      </LinkButton>
      <LinkButton route={"friends"}>
        <FontAwesomeIcon icon={faUserFriends} />
        Friends
      </LinkButton>
      {IsOwnProfile ? (
        <LinkButton route={"likedPosts"}>
          <FontAwesomeIcon icon={faBookBookmark} />
          Liked Posts
        </LinkButton>
      ) : (
        <LinkButton route={"addFriend"}>
          <FontAwesomeIcon icon={faUserPlus} />
          Add Friend
        </LinkButton>
      )}
    </div>
  );
}
