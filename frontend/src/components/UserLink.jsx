/* eslint-disable react/prop-types */
import {
  faBookOpen,
  faComment,
  faUserFriends,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userService from "../services/userService";
import NameLink from "./NameLink";

export default function UserLink({ user }) {
  const currentUser = userService.getCurrentUser();
  const isSelf = currentUser && currentUser.userId === user.id;
  return (
    <article className="bg-white rounded-xl p-4 text-start">
      <NameLink
        to={`/users/${user.id}/profile`}
        name={user.username}
        isSelf={isSelf}
      />
      <span className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faUserTag} />
        {user.displayName}
      </span>
      <div className="flex gap-4 justify-start pt-4">
        <p className="flex gap-2 items-center sm:flex-row flex-col">
          <span className="hidden sm:inline">Posts</span>{" "}
          <FontAwesomeIcon icon={faBookOpen} />{" "}
          <span className="text-slate-400">{user.posts.length}</span>
        </p>
        <p className="flex gap-2 items-center sm:flex-row flex-col">
          <span className="hidden sm:inline">Comments</span>{" "}
          <FontAwesomeIcon icon={faComment} />
          <span className="text-slate-400">{user.comments.length}</span>
        </p>
        <p className="flex gap-2 items-center sm:flex-row flex-col">
          <span className="hidden sm:inline">Friends</span>{" "}
          <FontAwesomeIcon icon={faUserFriends} />{" "}
          <span className="text-slate-400">{user.friends.length}</span>
        </p>
      </div>
      <p className="text-slate-400 py-4">{user.about || "-"}</p>
    </article>
  );
}
