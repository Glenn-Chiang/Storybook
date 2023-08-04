/* eslint-disable react/prop-types */
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function NameLink({ to, name, isSelf }) {
  return (
    <Link to={to} className="flex gap-2 items-center w-max p-2 rounded-xl hover:bg-sky-200">
      <FontAwesomeIcon icon={faUserCircle} />
      <span>
        {name} <span className="text-slate-400">{isSelf && "(You)"}</span>
      </span>
    </Link>
  );
}
