import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext"
import userService from "../services/userService";

export default function Root() {
  const [currentUser, setCurrentUser] = useState(null)
  // console.log('Context user:', currentUser)
  // const user = userService.getCurrentUser();
  // console.log("Local storage user: ", user);
  
  useEffect(() => {
    const user = userService.getCurrentUser()
    // console.log('Local storage user: ', user)
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
    </AuthContext.Provider>
  );
}
