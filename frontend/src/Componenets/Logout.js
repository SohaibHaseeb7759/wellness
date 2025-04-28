import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  const navigate = useNavigate();
  sessionStorage.removeItem("hasVisitedProfile"); // Clear session storage

  useEffect(() => {
    sessionStorage.removeItem("token");

    navigate("/");
    window.location.reload();
  }, [navigate]);

  return <div></div>;
}

export default Logout;
