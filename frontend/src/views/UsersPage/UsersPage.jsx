/* eslint-disable react/prop-types */
import {
  faBookOpen,
  faComment,
  faSearch,
  faUserFriends,
  faUserTag,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import NameLink from "../../components/NameLink";
import userService from "../../services/userService";
import Dropdown from "../../components/Dropdown"

export default function UsersPage() {
  const [users, setUsers] = useState(useLoaderData());
  const [searchTerms, setSearchTerms] = useState("");
  const [searchBy, setSearchBy] = useState("username")
  const searchFields = [{label: 'Username', value: "username"}, {label: 'Display name', value: "displayName"}]

  const getUserMatches = useCallback(async () => {
    const userMatches = await userService.getMatches(searchTerms, searchBy);
    setUsers(userMatches);
  }, [searchTerms, searchBy]);

  useEffect(() => {
    getUserMatches();
  }, [getUserMatches]);

  const handleInputChange = (event) => {
    setSearchTerms(event.target.value);
  };

  return (
    <main className="text-center">
      <h1>
        <FontAwesomeIcon icon={faUsers} />
        Users
      </h1>
      <div className="flex justify-center p-4">
        <Dropdown label={"Search users by"} options={searchFields} setOption={setSearchBy}/>
      </div>
      <SearchBar onChange={handleInputChange} />
      <section className="bg-transparent">
        <p>Showing results for: <span className="text-slate-400">{`"${searchTerms}"` || "All users"}</span></p>
        <ul className="p-4 flex flex-col gap-4 ">
          {users.length > 0 ? users.map((user) => (
            <li key={user.id}>
              <UserLink user={user} />
            </li>
          )) : <p className="text-slate-400 bg-white p-4 rounded-xl">No users found</p>}
        </ul>
      </section>
    </main>
  );
}

function UserLink({ user }) {
  const currentUser = userService.getCurrentUser();
  const isSelf = currentUser.userId === user.id;
  return (
    <article className="bg-white rounded-xl p-4 text-start">
      <NameLink
        to={`/users/${user.id}/profile`}
        name={user.username}
        isSelf={isSelf}
      />
      <span className="flex gap-2 items-center">
      <FontAwesomeIcon icon={faUserTag}/>
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

function SearchBar({ onChange }) {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <div className="flex justify-center">
      <input
        className="w-3/4 rounded-l-xl rounded-r-none bg-white"
        ref={searchRef}
        onChange={onChange}
      />
      <button className="bg-sky-400 hover:bg-sky-500 text-white rounded-r-xl w-16 shadow">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
