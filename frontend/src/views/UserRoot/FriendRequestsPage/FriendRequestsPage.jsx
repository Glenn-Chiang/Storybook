/* eslint-disable react/prop-types */
import {
  faCheck,
  faCircleArrowLeft,
  faCircleArrowRight,
  faEnvelope,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData } from "react-router-dom";
import NameLink from "../../../components/NameLink";
import { CancelButton } from "../../../components/buttons";
import friendRequestService from "../../../services/friendRequestService";
import userService from "../../../services/userService";

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
  const user = userService.getCurrentUser();

  const handleAccept = async () => {
    try {
      friendRequestService.resolve(user.id, request.id, "accepted");
    } catch (error) {
      console.log("Error accepting friend request:", error);
    }
  };

  const handleReject = async () => {
    try {
      friendRequestService.resolve(user.id, request.id, "rejected");
    } catch (error) {
      console.log("Error rejecting friend request:", error);
    }
  };

  return (
    <li className="flex justify-between flex-col sm:flex-row text-center">
      <div className="flex gap-2 items-center">
        <span className="text-slate-400">From</span>
        <NameLink
          to={`/users/${request.sender.id}/profile`}
          name={request.sender.username}
          isSelf={false}
        />
        <span className="text-slate-400">on</span>
        <span>{request.dateSent}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="bg-teal-400 hover:bg-teal-500 text-white p-2 rounded-xl w-10 h-10"
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button
          onClick={handleReject}
          className="bg-rose-400 hover:bg-rose-500 text-white p-2 rounded-xl w-10 h-10"
        >
          <FontAwesomeIcon icon={faRemove} />
        </button>
      </div>
    </li>
  );
}

function SentRequest({ request }) {
  return (
    <li className="text-center flex justify-between sm:flex-row flex-col">
      <div className="flex items-center gap-2">
        <span className="text-slate-400">To</span>
        <div>
          <NameLink
            to={`/users/${request.recipient.id}/profile`}
            name={request.recipient.username}
            isSelf={false}
          />
        </div>
        <span className="text-slate-400">on</span>
        <span>{request.dateSent}</span>
      </div>
      <div className="flex gap-2">
        <div
          className={`p-2 rounded-lg capitalize ${
            request.status === "pending"
              ? "bg-slate-200 text-slate-400"
              : request.status === "accepted"
              ? "bg-green-200 text-emerald-400"
              : "bg-rose-200 text-rose-400"
          }`}
        >
          {request.status}
        </div>
        <div>
          {request.status === "pending" ? <CancelButton /> : <ClearButton />}
        </div>
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
