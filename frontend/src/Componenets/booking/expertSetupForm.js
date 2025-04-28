// src/components/booking/ExpertSetupForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  setName,
  setExpertise,
  setBio,
  setAvailability,
  clearForm,
} from "../../Reducers/expertSlice"; // Adjust the path as needed
import "../../CSS/Experts/expertSetupForm.css";

const ExpertSetupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, expertise, bio, availability } = useSelector(
    (state) => state.expert
  );
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // State to manage form visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    console.log("Submitting form with data:", {
      name,
      expertise,
      bio,
      availability,
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/book/update",
        { name, expertise, bio, availability },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // Include the token in the headers
          },
        }
      );
      console.log("Expert profile created:", response.data);
      dispatch(clearForm()); // Clear the form after successful submission
      setIsSubmitted(true); // Hide the form after successful submission
    } catch (err) {
      console.error(
        "Error creating expert profile:",
        err.response?.data || err.message
      );
      setError("An error occurred. Please try again.");
    }
  };

  if (isSubmitted) {
    return <div className="form-container1">Profile setup complete!</div>;
  }

  return (
    <div className="form-container1">
      <h2>Setup Your Expert Profile</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="expert-form">
        <div className="form-group1">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="expertise">Expertise:</label>
          <input
            type="text"
            id="expertise"
            value={expertise}
            onChange={(e) => dispatch(setExpertise(e.target.value))}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => dispatch(setBio(e.target.value))}
            required
          />
        </div>
        <div className="form-group1">
          <label htmlFor="availability">Availability (comma-separated):</label>
          <input
            type="text"
            id="availability"
            value={availability.join(",")}
            onChange={(e) =>
              dispatch(setAvailability(e.target.value.split(",")))
            }
            required
          />
        </div>
        <button type="submit" className="submit-button1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExpertSetupForm;
