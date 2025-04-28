import React, { useState } from "react";
import axios from "axios";
import "../../CSS/Profile/createProfile.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    wellnessGoals: "",
    healthCondition: "",
    achievements: [
      {
        title: "",
        description: "",
        date: "",
      },
    ],
    profilePicture: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, profilePicture: e.target.files[0] });
  };

  const handleAchievementChange = (index, e) => {
    const { name, value } = e.target;
    const newAchievements = [...profile.achievements];
    newAchievements[index][name] = value;
    setProfile({ ...profile, achievements: newAchievements });
  };

  const addAchievement = () => {
    setProfile({
      ...profile,
      achievements: [
        ...profile.achievements,
        { title: "", description: "", date: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in profile) {
      if (profile.hasOwnProperty(key)) {
        if (key === "achievements") {
          formData.append(key, JSON.stringify(profile[key]));
        } else {
          formData.append(key, profile[key]);
        }
      }
    }

    // Debugging: Log each entry in formData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/profiles/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token, // Include the token in the headers
          },
        }
      );
      console.log("Profile created:", response.data);
      navigate("/home");
    } catch (error) {
      console.error(
        "Error creating profile:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="form-container" style={{ backgroundColor: "transparent" }}>
      <h2 style={{ backgroundColor: "transparent", color: "black" }}>
        Create Profile
      </h2>
      <form onSubmit={handleSubmit} style={{ backgroundColor: "transparent" }}>
        <div className="form-name" style={{ backgroundColor: "transparent" }}>
          <div className="form-group">
            {/* <label htmlFor="firstName" className="placeholder" for="styledInput">
            First Name
          </label> */}
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={profile.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="lastName">Last Name</label> */}
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={profile.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-ag">
          <div className="form-group">
            {/* <label htmlFor="age">Age</label> */}
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Age"
              value={profile.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="gender">Gender</label> */}
            <input
              type="text"
              name="gender"
              id="gender"
              placeholder="Gender"
              value={profile.gender}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-wh">
          <div className="form-group">
            {/* <label htmlFor="wellnessGoals">Wellness Goals</label> */}
            <input
              type="text"
              name="wellnessGoals"
              id="wellnessGoals"
              placeholder="Wellness Goals"
              value={profile.wellnessGoals}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="healthCondition">Health Condition</label> */}
            <input
              type="text"
              name="healthCondition"
              id="healthCondition"
              placeholder="Health Condition"
              value={profile.healthCondition}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          className="achievements"
          style={{ backgroundColor: "transparent" }}
        >
          {/* <label>Achievements:</label> */}
          {profile.achievements.map((achievement, index) => (
            <div className="achievement-item" key={index}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={achievement.title}
                onChange={(e) => handleAchievementChange(index, e)}
                className="form-title"
              />

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={achievement.description}
                onChange={(e) => handleAchievementChange(index, e)}
              />
              <input
                type="date"
                name="date"
                value={achievement.date}
                onChange={(e) => handleAchievementChange(index, e)}
              />
            </div>
          ))}
          <button
            type="button"
            className="add-achievement-btn"
            onClick={addAchievement}
          >
            Add More Achievement
          </button>
        </div>
        <div style={{ backgroundColor: "transparent" }}>
          <label
            htmlFor="profilePicture"
            style={{ backgroundColor: "transparent", color: "black" }}
          >
            Profile Picture{" "}
          </label>
          <input
            className="file"
            type="file"
            name="profilePicture"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="submit-btn button">
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
