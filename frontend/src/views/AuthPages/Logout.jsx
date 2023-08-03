import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfirmButton } from "../../components/buttons";
import userService from "../../services/userService";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      userService.logout();
      console.log("Logged out");
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <section className="bg-white rounded-xl flex flex-col items-center p-4 inset-x-0 m-auto">
      <h1 className="p-4 flex gap-2 items-center">
        <FontAwesomeIcon icon={faSignOut} />
        Logout
      </h1>
      <p className="text-slate-500">Are you sure you want to logout?</p>
      <div className="p-4">
        <ConfirmButton onClick={handleLogout}>Logout</ConfirmButton>
      </div>
    </section>
  );
}
