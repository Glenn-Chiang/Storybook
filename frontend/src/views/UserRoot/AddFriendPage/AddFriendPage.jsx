import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfirmButton } from "../../../components/buttons";
import { useContext } from "react";
import UserContext from "../UserContext";
import { useLoaderData } from "react-router-dom";
import friendRequestService from "../../../services/friendRequestService";
import userService from "../../../services/userService"

export default function AddFriendPage() {
  const user = useContext(UserContext);
  const currentUser = userService.getCurrentUser()
  const requestPending = useLoaderData();

  const sendFriendRequest = async () => {
    try {
      await friendRequestService.send(currentUser.userId, user.id);
    } catch (error) {
      console.log("Error sending friend request");
    }
  };

  return (
    <main>
      <h1>
        <FontAwesomeIcon icon={faUserPlus} />
        Add Friend
      </h1>
      <section className="bg-white flex flex-col items-center m-auto">
        {requestPending ? (
          <p className="text-slate-400">Request pending</p>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-slate-500">
              Send a friend request to {user.username}?
            </p>
            <ConfirmButton onClick={sendFriendRequest}>Send</ConfirmButton>
          </div>
        )}
      </section>
    </main>
  );
}
