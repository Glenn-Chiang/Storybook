import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* eslint-disable react/prop-types */
export default function Alert({children}) {
  return (
    <div className="fixed top-12 right-2 bg-emerald-200 text-emerald-500 p-2 rounded border-emerald-400 border-2 flex gap-2 items-center">
      <FontAwesomeIcon icon={faCheckCircle}/>
      {children}
    </div>
  )
}