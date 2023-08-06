/* eslint-disable react/prop-types */
import { faSadCry, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData } from "react-router-dom";
import UserLink from "../../../components/UserLink"

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
    <ul className="w-full">
      {friends.map((user) => (
        <li className="bg-white rounded-xl" key={user.id}>
          <UserLink user={user}/>
        </li>
      ))}
    </ul>
  );
}
