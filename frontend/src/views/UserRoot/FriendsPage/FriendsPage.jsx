/* eslint-disable react/prop-types */
import { faSadCry, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData, useParams } from "react-router-dom";
import UserLink from "../../../components/UserLink"
import userService from "../../../services/userService";

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
  const userId = useParams().userId
  const handleUnfriend = async (friendId) => {
    try {
      await userService.unfriend(userId, friendId)
    } catch (error) {
      console.log("Error unfriending user:", error)
    }
  }

  return (
    <ul className="w-full">
      {friends.map((user) => (
        <li className="bg-white rounded-xl relative" key={user.id}>
          <UserLink user={user}/>
          <UnfriendButton onClick={() => handleUnfriend(user.id)}/>
        </li>
      ))}
    </ul>
  );
}

function UnfriendButton({onClick}) {
  return (
    <button onClick={onClick} className="absolute top-1 right-1 p-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-400 hover:text-slate-500">
      Unfriend
    </button>
  )
}
