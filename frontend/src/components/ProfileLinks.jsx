/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faBook,
  faBookBookmark,
  faComment,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

export function ProfileLink({ route, children }) {
  return (
    <Link
      to={route}
      className="bg-sky-200 hover:bg-sky-300 text-sky-500 w-28 h-28 flex flex-col justify-center items-center gap-2 p-4 rounded-xl"
    >
      {children}
    </Link>
  );
}

export function ProfileLinks({IsOwnProfile}) {
  return (
    <div className="p-4 grid sm:grid-cols-4 grid-cols-2 gap-4">
      <ProfileLink route={'posts'}>
        <FontAwesomeIcon icon={faBook} />
        Posts
      </ProfileLink>
      <ProfileLink route={'comments'}>
        <FontAwesomeIcon icon={faComment} />
        Comments
      </ProfileLink>
      {IsOwnProfile && (
        <ProfileLink route={'likedPosts'}>
          <FontAwesomeIcon icon={faBookBookmark} />
          Liked Posts
        </ProfileLink>
      )}
      <ProfileLink route={'friends'}>
        <FontAwesomeIcon icon={faUserFriends} />
        Friends
      </ProfileLink>
    </div>
  );
}
