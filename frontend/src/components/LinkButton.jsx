/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

export function LinkButton({ route, children }) {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        `bg-sky-200 text-sky-500 w-28 h-28 text-center flex flex-col justify-center items-center gap-2 p-4 rounded-xl ${
          isActive
            ? "bg-sky-400 text-sky-100"
            : "hover:bg-sky-300 hover:text-sky-600"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

