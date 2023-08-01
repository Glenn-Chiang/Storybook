/* eslint-disable react/prop-types */
import { Outlet, useLoaderData, useParams } from "react-router-dom";
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

