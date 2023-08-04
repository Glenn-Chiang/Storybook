import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfirmButton } from "../../../components/buttons";
import { useContext } from "react";
import UserContext from "../UserContext";
import userService from "../../../services/userService";
import { useLoaderData } from "react-router-dom";

export default function AddFriendPage() {
  const user = useContext(UserContext);

  const requestPending = useLoaderData();

  const sendFriendRequest = async () => {
    try {
      await userService.sendFriendRequest(user.id);
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
          <form className="flex flex-col gap-4">
            <p className="text-slate-500">
              Send a friend request to {user.username}?
            </p>
            <ConfirmButton onClick={sendFriendRequest}>Send</ConfirmButton>
          </form>
        )}
      </section>
    </main>
  );
}
