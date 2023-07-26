/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function LinkButton({children, to}) {
  return (
    <Link className="text-white bg-sky-500 hover:bg-sky-600 p-2 rounded-xl" to={to}>{children}</Link>
  )
}