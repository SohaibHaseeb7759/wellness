import { useSelector } from "react-redux";
import BookSession from "./booking/bookSession";
import CalendarView from "./booking/calenderView";
import ExpertSetupForm from "./booking/expertSetupForm";
import Chat from "./booking/videoChat";
import ExpertChat from "./booking/expertChat"; // Import ExpertChat
import ExpertsList from "./booking/expertList";
import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Routers/Booking.css";

function Booking() {
  const { profile: userProfile } = useSelector((state) => state.auth);
  const [isTrue, setIsTrue] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expertId, setExpertId] = useState(""); // State for expertId input

  useEffect(() => {
    const fetchProfile = async () => {
      if (userProfile.role === "expert") {
        try {
          const token = sessionStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:5000/api/book/${userProfile._id}`,
            {
              headers: { "x-auth-token": token },
            }
          );
          setProfile(response.data);
        } catch (err) {
          if (err.response && err.response.status === 404) {
            // Profile not found, set profile to null
            setProfile(null);
          } else {
            console.error("Error fetching expert profile:", err);
            setError("An error occurred while fetching the expert profile.");
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // If not an expert, set loading to false immediately
      }
    };

    if (userProfile && userProfile._id) {
      fetchProfile();
    }
  }, [userProfile]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleClick = () => {
    setIsTrue((prev) => !prev);
  };

  return (
    <div>
      <button className="button" onClick={handleClick}>
        {isTrue ? "Close Expert List" : "Expert List"}
      </button>
      {isTrue && <ExpertsList />}

      {userProfile && userProfile.role === "expert" && !profile && (
        <ExpertSetupForm />
      )}

      <BookSession />
      <CalendarView />

      <div>
        {userProfile.role !== "expert" && (
          <div className="expert_box">
            <p className="expert_para">
              To start communication, enter Expert ID
            </p>
            <input
              type="text"
              value={expertId}
              onChange={(e) => setExpertId(e.target.value)}
              placeholder="Enter Expert ID"
              className="expert_inputField"
            />
            {expertId && <Chat userId={userProfile._id} expertId={expertId} />}
          </div>
        )}

        {userProfile.role === "expert" && (
          <ExpertChat expertId={userProfile._id} />
        )}
      </div>
    </div>
  );
}

export default Booking;
