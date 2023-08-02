import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState(useLoaderData())
  return (
    <main>
      <h1>
        <FontAwesomeIcon icon={faUsers} />
        Users
      </h1>
      <ul>
        {users.map(user => <li key={user.id}>{user.displayName}</li>)}
      </ul>
    </main>
  );
}
