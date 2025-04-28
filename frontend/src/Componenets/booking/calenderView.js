import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../CSS/Experts/calenderView.css";

const CalendarView = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/book/user-bookings",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error(
          "Error fetching bookings:",
          error.response?.data || error.message
        );
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Bookings</h2>
      <div className="calendar-flex">
        {bookings.map((booking) => (
          <div key={booking._id} className="calendar-card">
            <p className="calendar-date">
              {booking.date} - {booking.startTime} to {booking.endTime} with{" "}
              {booking.expertId.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
