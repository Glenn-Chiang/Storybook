import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FriendsPage() {
  return (
    <>
      <h1>
        <FontAwesomeIcon icon={faUserFriends} />
        Friends
      </h1>
    </>
  );
}
