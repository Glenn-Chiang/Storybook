import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import AuthContext from "../AuthContext"
import userService from "../services/userService";

export default function Root() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const currentUser = userService.getCurrentUser()
    if (currentUser) {
      setCurrentUser(currentUser)
    }
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
}
