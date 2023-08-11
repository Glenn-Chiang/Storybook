import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext"
import userService from "../services/userService";

export default function Root() {
  const [currentUser, setCurrentUser] = useState(null)
  
  useEffect(() => {
    const user = userService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    } 
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
      <ScrollRestoration getKey={location => location.pathname}/>
    </AuthContext.Provider>
  );
}
