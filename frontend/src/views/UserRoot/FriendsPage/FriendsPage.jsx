/* eslint-disable react/prop-types */
import { faSadCry, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData } from "react-router-dom";

export default function FriendsPage() {
  const friends = useLoaderData();
  return (
    <main>
      <h1>
        <FontAwesomeIcon icon={faUserFriends} />
        Friends
      </h1>
      {friends.length > 0 ? (
        <section className="bg-transparent">
          <FriendsList friends={friends} />
        </section>
      ) : (
        <section>
          No friends found <FontAwesomeIcon icon={faSadCry} />
        </section>
      )}
    </main>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
}
