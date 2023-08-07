/* eslint-disable react/prop-types */
import {
  faSearch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import userService from "../../services/userService";
import Dropdown from "../../components/Dropdown";
import UserLink from "../../components/UserLink";

export default function UsersPage() {
  const [users, setUsers] = useState(useLoaderData());
  const [searchTerms, setSearchTerms] = useState("");
  const [searchBy, setSearchBy] = useState("username");
  const searchFields = [
    { label: "Username", value: "username" },
    { label: "Display name", value: "displayName" },
  ];

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
        <Dropdown
          label={"Search users by"}
          options={searchFields}
          setOption={setSearchBy}
        />
      </div>
      <SearchBar onChange={handleInputChange} />
      <section className="bg-transparent">
        <p>
          Showing results for:{" "}
          <span className="text-slate-400">
            {`"${searchTerms}"` || "All users"}
          </span>
        </p>
        <ul className="p-4 flex flex-col gap-4 w-full">
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                <UserLink user={user} />
              </li>
            ))
          ) : (
            <p className="text-slate-400 bg-white p-4 rounded-xl">
              No users found
            </p>
          )}
        </ul>
      </section>
    </main>
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
