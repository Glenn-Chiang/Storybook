/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faBookBookmark,
  faBookOpen,
  faComment,
  faUserCircle,
  faUserFriends,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export function ProfileLink({ route, children }) {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        `bg-sky-200 text-sky-500 w-28 h-28 flex flex-col justify-center items-center gap-2 p-4 rounded-xl ${
          isActive
            ? "bg-sky-400 text-sky-100"
            : "hover:bg-sky-300 hover:text-sky-600"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export function ProfileLinks({ IsOwnProfile }) {
  return (
    <div className="grid sm:grid-cols-5 grid-cols-2 gap-4">
      <ProfileLink route={"profile"}>
        <FontAwesomeIcon icon={faUserCircle} />
        Profile
      </ProfileLink>
      <ProfileLink route={"posts"}>
        <FontAwesomeIcon icon={faBookOpen} />
        Posts
      </ProfileLink>
      <ProfileLink route={"comments"}>
        <FontAwesomeIcon icon={faComment} />
        Comments
      </ProfileLink>
      <ProfileLink route={"friends"}>
        <FontAwesomeIcon icon={faUserFriends} />
        Friends
      </ProfileLink>
      {IsOwnProfile ? (
        <ProfileLink route={"likedPosts"}>
          <FontAwesomeIcon icon={faBookBookmark} />
          Liked Posts
        </ProfileLink>
      ) : (
        <AddFriendButton />
      )}
    </div>
  );
}

function AddFriendButton() {
  return (
    <button className="bg-sky-200 hover:bg-sky-300 text-sky-500 hover:text-sky-600 w-28 h-28 flex flex-col justify-center items-center gap-2 p-4 rounded-xl">
      <FontAwesomeIcon icon={faUserPlus} />
      Add Friend
    </button>
  );
}
