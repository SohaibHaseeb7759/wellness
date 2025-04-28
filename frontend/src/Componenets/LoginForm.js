import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, loginUser } from "../Reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Routers/Login.css";
import ResetPassword from "./password/resetPassword";
import RequestPasswordReset from "./password/requestResetPassword";

function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ username, password })).unwrap();
      // Fetch the user profile after successful login
      await dispatch(getUserProfile()).unwrap();
      // Redirect to the profile page
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="form-ui">
      <form onSubmit={handleSubmit} className="form">
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
                placeholder="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div id="submit-button-cvr">
            <button id="submit-button" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          {error && <div id="error-message">{error}</div>}
          <div id="forgot-pass">
            <Link to="/request-password-reset">Forgot password?</Link>
          </div>
          <div id="forgot-pass">
            <p>Coming for the first time </p>
            <a href="/register">SignUp</a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
