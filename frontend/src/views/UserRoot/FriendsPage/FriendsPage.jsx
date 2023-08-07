/* eslint-disable react/prop-types */
import { faSadCry, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData, useParams } from "react-router-dom";
import UserLink from "../../../components/UserLink";
import Modal from "../../../components/Modal";
import { ConfirmButton, CancelButton } from "../../../components/buttons";
import userService from "../../../services/userService";
import { useEffect, useState, useCallback } from "react";

export default function FriendsPage() {
  const [friends, setFriends] = useState(useLoaderData())
  const userId = useParams().userId;

  const getFriends = useCallback(async () => {
    try {
      const friends = await userService.getFriends(userId);
      setFriends(friends);
    } catch (error) {
      console.log("Error getting user friends:", error);
    }
  }, [userId])

  useEffect(() => {
    getFriends()
  }, [getFriends])

  return (
    <main>
      <h1>
        <FontAwesomeIcon icon={faUserFriends} />
        Friends ({friends.length})
      </h1>
      {friends.length > 0 ? (
        <section className="bg-transparent">
          <FriendsList friends={friends} updateState={getFriends}/>
        </section>
      ) : (
        <section className="text-slate-400">
          No friends found <FontAwesomeIcon icon={faSadCry} />
        </section>
      )}
    </main>
  );
}

function FriendsList({ friends, updateState }) {
  const userId = useParams().userId;
  const currentUser = userService.getCurrentUser()
  const isOwnPage = currentUser && currentUser.userId === userId
  const [modalShown, setModalShown] = useState(false);

  const handleUnfriend = async (friendId) => {
    try {
      setModalShown(false)
      await userService.unfriend(userId, friendId);
      updateState()
      console.log("Unfriended")
    } catch (error) {
      console.log("Error unfriending user:", error);
    }
  };

  return (
    <ul className="w-full">
      {friends.map((user) => (
        <li className="bg-white rounded-xl relative" key={user.id}>
          <UserLink user={user} />
          {isOwnPage && <UnfriendButton onClick={() => setModalShown(true)} />}
          {modalShown && (
            <UnfriendModal
              username={user.username}
              onConfirm={() => handleUnfriend(user.id)}
              onCancel={() => setModalShown(false)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

function UnfriendButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1 right-1 p-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-400 hover:text-slate-500"
    >
      Unfriend
    </button>
  );
}

function UnfriendModal({ username, onConfirm, onCancel }) {
  return (
    <Modal>
      <p className="text-slate-400 p-4 text-center">
        Are you sure you want to unfriend{" "}
        <span className="text-sky-500">{username}</span>?
      </p>
      <div className="p-4 flex gap-2">
        <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
        <CancelButton onClick={onCancel} />
      </div>
    </Modal>
  );
}
