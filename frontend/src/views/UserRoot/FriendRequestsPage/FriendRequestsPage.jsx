/* eslint-disable react/prop-types */
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData } from "react-router-dom";

export default function FriendRequestsPage() {
  const { received: requestsReceived, sent: requestsSent } = useLoaderData();
  return (
    <main className="flex flex-col gap-4">
      <h1>
        <FontAwesomeIcon icon={faEnvelope} />
        Friend Requests
      </h1>
      <section className="items-start">
        <h2>
          Received
          <FontAwesomeIcon icon={faCircleArrowLeft} />
        </h2>
        <RequestList users={requestsReceived} requestType={"received"} />
      </section>
      <section className="items-start">
        <h2>
          Sent
          <FontAwesomeIcon icon={faCircleArrowRight} />
        </h2>
        <RequestList users={requestsSent} requestType={"sent"} />
      </section>
    </main>
  );
}

function RequestList({ users, requestType }) {
  return (
    <ul>
      {users.length > 0 ? (
        users.map((user) => <li key={user.id}>{user.username}</li>)
      ) : (
        <p className="text-slate-500">No pending requests {requestType}</p>
      )}
    </ul>
  );
}
