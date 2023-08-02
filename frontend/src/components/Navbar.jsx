/* eslint-disable react/prop-types */
import {
  faBookOpen,
  faBookReader,
  faSignIn,
  faUserCircle,
  faUserGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import userService from "../services/userService";

export default function Navbar() {
  const currentUser = userService.getCurrentUser();

  return (
    <nav className="flex justify-between fixed w-full h-10 bg-sky-200 text-sky-500 z-10">
      <NavItem to={"/posts"}>
        <FontAwesomeIcon icon={faBookReader} />
        StoryBook
        <NavDropdown />
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
      className={
        "p-4 text-xl flex gap-2 items-center hover:bg-sky-300 hover:text-sky-600 group"
      }
    >
      {children}
    </NavLink>
  );
}

function NavDropdown() {
  return (
    <nav className="absolute top-10 left-0 flex-col hidden group-hover:flex text-lg bg-sky-200 rounded">
      <DropdownLink to={"/posts"}>
        <FontAwesomeIcon icon={faBookOpen} />
        Posts
      </DropdownLink>
      <DropdownLink to={"/users"}>
        <FontAwesomeIcon icon={faUsers} />
        Users
      </DropdownLink>
      <DropdownLink to={"/groups"}>
        <FontAwesomeIcon icon={faUserGroup} />
        Groups
      </DropdownLink>
    </nav>
  );
}

function DropdownLink({ children, to }) {
  return (
    <Link
      className="flex gap-2 items-center justify-center p-2 hover:bg-sky-300 hover:text-sky-600 text-sky-500"
      to={to}
    >
      {children}
    </Link>
  );
}
