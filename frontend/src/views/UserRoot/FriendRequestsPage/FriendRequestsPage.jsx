/* eslint-disable react/prop-types */
import {
  faCancel,
  faCircleArrowLeft,
  faCircleArrowRight,
  faEnvelope,
  faRemove,
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
    <table className="w-full">
      <tbody>
        {requests.length > 0 ? (
          requests.map((request) =>
            requestType === "received" ? (
              <ReceivedRequest key={request.id} request={request} />
            ) : (
              <SentRequest key={request.id} request={request} />
            )
          )
        ) : (
          <tr className="text-slate-400">
            <td className="py-4">No requests {requestType}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function ReceivedRequest({ request }) {
  return (
    <tr>
      <NameLink
        to={`/users/${request.sender.id}/profile`}
        name={request.sender.username}
        isSelf={false}
      />
    </tr>
  );
}

function SentRequest({ request }) {
  return (
    <tr className="text-center">
      <td>
        <NameLink
          to={`/users/${request.recipient.id}/profile`}
          name={request.recipient.username}
          isSelf={false}
        />
      </td>
      <td className="text-slate-400">{request.dateSent}</td>
      <td
        className={`p-2 rounded-lg capitalize ${
          request.status === "pending"
            ? "bg-slate-200 text-slate-400"
            : request.status === "accepted"
            ? "bg-green-200 text-emerald-400"
            : "bg-rose-200 text-rose-400"
        }`}
      >
        {request.status}
      </td>
      <td>
        {request.status === "pending" ? <CancelButton /> : <ClearButton />}
      </td>
    </tr>
  );
}

function CancelButton({ handleClick }) {
  return (
    <button className="bg-rose-400 text-white hover:bg-rose-500 rounded-xl p-2 w-10 h-10 relative group" onClick={handleClick}>
      <FontAwesomeIcon icon={faCancel} />
      <span className="bg-rose-200 text-rose-400 absolute top-12 -left-10 md:top-0 md:left-12 p-2 rounded-lg w-max hidden group-hover:inline-block">Cancel request</span>
    </button>
  );
}

function ClearButton({ handleClick }) {
  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon icon={faRemove} />
    </button>
  );
}
