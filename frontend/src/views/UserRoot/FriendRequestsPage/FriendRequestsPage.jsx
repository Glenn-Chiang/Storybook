/* eslint-disable react/prop-types */
import {
  faCheck,
  faCircleArrowLeft,
  faCircleArrowRight,
  faEnvelope,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useLoaderData,
  useParams,
} from "react-router-dom";
import NameLink from "../../../components/NameLink";
import { CancelButton } from "../../../components/buttons";
import friendRequestService from "../../../services/friendRequestService";
import { useEffect, useState, useCallback } from "react";

export default function FriendRequestsPage() {
  const [friendRequests, setFriendRequests] = useState(useLoaderData());

  const { received: receivedRequests, sent: sentRequests } = friendRequests;

  const userId = useParams().userId;

  const getFriendRequests = useCallback(async () => {
    try {
      const received = await friendRequestService.get(userId, "received");
      const sent = await friendRequestService.get(userId, "sent");
      setFriendRequests({ received, sent });
    } catch (error) {
      console.log("Error getting friend requests:", error);
      return [];
    }
  }, [userId]);

  useEffect(() => {
    getFriendRequests();
  }, [getFriendRequests]);

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
        <RequestList
          requests={receivedRequests}
          requestType={"received"}
          updateState={getFriendRequests}
        />
      </section>
      <section className="items-start">
        <h2>
          Sent
          <FontAwesomeIcon icon={faCircleArrowRight} />
        </h2>
        <RequestList
          requests={sentRequests}
          requestType={"sent"}
          updateState={getFriendRequests}
        />
      </section>
    </main>
  );
}

function RequestList({ requests, requestType, updateState }) {
  return (
    <ul className="w-full flex flex-col gap-4">
      {requests.length > 0 ? (
        requests.map((request) =>
          requestType === "received" ? (
            <ReceivedRequest
              key={request.id}
              request={request}
              updateState={updateState}
            />
          ) : (
            <SentRequest
              key={request.id}
              request={request}
              updateState={updateState}
            />
          )
        )
      ) : (
        <p className="text-slate-400">No requests {requestType}</p>
      )}
    </ul>
  );
}

function ReceivedRequest({ request, updateState }) {
  const userId = useParams().userId;

  const handleAccept = async () => {
    try {
      await friendRequestService.resolve(userId, request.id, "accepted");
      updateState();
    } catch (error) {
      console.log("Error accepting friend request:", error);
    }
  };

  const handleReject = async () => {
    try {
      await friendRequestService.resolve(userId, request.id, "rejected");
      updateState();
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

function SentRequest({ request, updateState }) {
  const userId = useParams().userId

  const handleCancel = async () => {
    try {
      await friendRequestService.cancel(userId, request.id);
      updateState()
    } catch (error) {
      console.log("Error cancelling friend request:", error);
    }
  };

  const handleClose = async () => {
    try {
      await friendRequestService.close(userId, request.id);
      updateState()
    } catch (error) {
      console.log("Error closing resolved friend request:", error);
    }
  };

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
          {request.status === "pending" ? <CancelButton onClick={handleCancel}/> : <CloseButton onClick={handleClose}/>}
        </div>
      </div>
    </li>
  );
}

function CloseButton({ onClick }) {
  return (
    <button
      className="bg-sky-300 hover:bg-sky-400 text-white p-2 rounded-xl"
      onClick={onClick}
    >
      Close
    </button>
  );
}
