import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function LoginLink() {
  return (
    <Link to={'/login'} className="absolute top-2 right-2 shadow flex gap-2 items-center bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-xl transition">
      <FontAwesomeIcon icon={faSignIn}/>
      Login
    </Link>
  )
}