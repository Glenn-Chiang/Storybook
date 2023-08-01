/* eslint-disable react/prop-types */
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
    <nav className="text-xl flex justify-between fixed w-full h-10 bg-sky-200 text-sky-500 z-10">
      <NavItem to={"/posts"}>
        <FontAwesomeIcon icon={faBookReader} />
        StoryBook
      </NavItem>
      {currentUser ? (
        <NavItem to={`users/${currentUser.userId}/profile`}>
          <FontAwesomeIcon icon={faUserCircle} />
          My Profile
        </NavItem>
      ) : (
        <NavItem to={"/login"}>
          <FontAwesomeIcon icon={faSignIn} />
          Login
        </NavItem>
      )}
    </nav>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={"p-2 flex gap-2 items-center hover:bg-sky-300 hover:text-sky-600"}
    >
      {children}
    </NavLink>
  );
}
