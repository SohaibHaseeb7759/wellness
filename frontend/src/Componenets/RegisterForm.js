import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Routers/Logup.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate inputs
      if (!username.trim()) {
        setError("Username is required.");
        return;
      }

      if (!email.trim() || !validateEmail(email)) {
        setError("Invalid email address.");
        return;
      }

      if (!password.trim() || password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      // Make the API call
      await axios.post("http://localhost:5000/api/users/register", {
        username,
        email,
        password,
        role,
      });

      // Navigate to the login page
      navigate("/verify");
    } catch (err) {
      // Handle server-side errors
      setError(
        err.response.data.message || "An error occurred. Please try again."
      );
    }
  };

  const validateEmail = (email) => {
    // Basic email validation
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  return (
    <div id="form-ui">
      <form onSubmit={handleSubmit} id="form">
        <div id="form-body">
          <div id="welcome-lines">
            <div id="welcome-line-1">WellWise</div>
            <div id="welcome-line-2">Welcome Back, Dear</div>
          </div>
          <div id="input-area">
            <div className="form-inp">
              <input
                placeholder="Username"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-inp">
              <input
                placeholder="Email"
                type="email"
                className="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-inp inp">
              <input
                placeholder="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-inp2">
              <div className="form-inp role">
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="user">User</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          </div>
          <div id="submit-button-cvr">
            <button id="submit-button" type="submit">
              SignUp
            </button>
          </div>
          <div id="forgot-pass">
            <p>Already have account </p>
            <a href="/">Login</a>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default Register;
