/* eslint-disable react/prop-types */
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData } from "react-router-dom";
import NameLink from "../../../components/NameLink";

export default function FriendRequestsPage() {
  const { received: receivedRequests, sent: sentRequests } = useLoaderData();
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
        <RequestList requests={receivedRequests} requestType={"received"} />
      </section>
      <section className="items-start">
        <h2>
          Sent
          <FontAwesomeIcon icon={faCircleArrowRight} />
        </h2>
        <RequestList requests={sentRequests} requestType={"sent"} />
      </section>
    </main>
  );
}

function RequestList({ requests, requestType }) {
  return (
    <ul className="py-4">
      {requests.length > 0 ? (
        requests.map((request) =>
          requestType === "received" ? (
            <ReceivedRequest key={request.id} request={request}/>
          ) : (
            <SentRequest key={request.id} request={request}/>
          )
        )
      ) : (
        <p className="text-slate-400">No requests</p>
      )}
    </ul>
  );
}

function ReceivedRequest({ request }) {
  <li>
    <NameLink
      to={`/users/${request.sender.id}/profile`}
      name={request.sender.username}
      isSelf={false}
    />
  </li>;
}

function SentRequest({ request }) {
  <li>
    <NameLink
      to={`/users/${request.recipient.id}/profile`}
      name={request.recipient.username}
      isSelf={false}
    />
  </li>;
}
