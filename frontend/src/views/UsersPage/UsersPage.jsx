import { faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState(useLoaderData())
  return (
    <main className="text-center">
      <h1>
        <FontAwesomeIcon icon={faUsers} />
        Users
      </h1>
      <SearchBar/>
      <ul className="p-4">
        {users.map(user => <li key={user.id}>{user.displayName}</li>)}
      </ul>
    </main>
  );
}

function SearchBar() {
  const searchRef = useRef()
  
  useEffect(() => {
    searchRef.current.focus()
  }, [])

  return (
    <div className="flex justify-center">
      <input className="w-3/4 rounded-l-xl rounded-r-none" ref={searchRef}/>
      <button className="bg-sky-400 hover:bg-sky-500 text-white rounded-r-xl w-16 shadow">
        <FontAwesomeIcon icon={faSearch}/>
      </button>
    </div>
  )
}
