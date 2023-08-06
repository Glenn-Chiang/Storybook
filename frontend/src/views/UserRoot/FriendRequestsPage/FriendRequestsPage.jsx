/* eslint-disable react/prop-types */
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData } from "react-router-dom";
import NameLink from "../../../components/NameLink";
import { CancelButton } from "../../../components/buttons";

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
    <ul className="w-full">
      {requests.length > 0 ? (
        requests.map((request) =>
          requestType === "received" ? (
            <ReceivedRequest key={request.id} request={request} />
          ) : (
            <SentRequest key={request.id} request={request} />
          )
        )
      ) : (
        <p className="text-slate-400">No requests {requestType}</p>
      )}
    </ul>
  );
}

function ReceivedRequest({ request }) {
  return (
    <li>
      <NameLink
        to={`/users/${request.sender.id}/profile`}
        name={request.sender.username}
        isSelf={false}
      />
    </li>
  );
}

function SentRequest({ request }) {
  request.status = "accepted";
  return (
    <li className="text-center flex items-center gap-2">
      <div className="flex-1">
        <NameLink
          to={`/users/${request.recipient.id}/profile`}
          name={request.recipient.username}
          isSelf={false}
        />
      </div>
      <div
        className={`flex-1 p-2 rounded-lg capitalize ${
          request.status === "pending"
            ? "bg-slate-200 text-slate-400"
            : request.status === "accepted"
            ? "bg-green-200 text-emerald-400"
            : "bg-rose-200 text-rose-400"
        }`}
      >
        {request.status}
      </div>
      <div className="hidden flex-1 sm:flex flex-col">
        <span className="text-slate-400">Date Sent</span>{" "}
        <span>{request.dateSent}</span>
      </div>
      <div className="hidden flex-1 sm:flex flex-col">
        <span className="capitalize text-slate-400">
          {request.status !== "pending" && `Date ${request.status}`}
        </span>{" "}
        <span className="text-slate-400">{request.dateResolved || "-"}</span>
      </div>
      <div className="flex-1">
        {request.status === "pending" ? <CancelButton /> : <ClearButton />}
      </div>
    </li>
  );
}

function ClearButton({ handleClick }) {
  return (
    <button
      className="bg-sky-300 hover:bg-sky-400 text-white p-2 rounded-xl"
      onClick={handleClick}
    >
      OK
    </button>
  );
}
