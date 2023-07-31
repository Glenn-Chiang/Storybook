import {
  faBookReader,
  faSignIn,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import userService from "../services/userService";

export default function Navbar() {
  const currentUser = userService.getCurrentUser();

  return (
    <nav className="text-lg flex justify-between fixed w-screen h-10 bg-sky-200 text-sky-500 p-4 pr-8">
      <NavLink to={"/posts"} className={"flex gap-2 items-center"}>
        <FontAwesomeIcon icon={faBookReader} />
        StoryBook
      </NavLink>
      {currentUser ? (
        <NavLink
          to={`users/${currentUser.userId}/profile`}
          className={"flex gap-2 items-center"}
        >
          <FontAwesomeIcon icon={faUserCircle} />
          My Profile
        </NavLink>
      ) : (
        <NavLink to={"/login"} className={"flex gap-2 items-center"}>
          <FontAwesomeIcon icon={faSignIn} />
          Login
        </NavLink>
      )}
    </nav>
  );
}
