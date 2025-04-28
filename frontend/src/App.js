import React, { useState } from "react";
import { useSelector } from "react-redux";

import LoginForm from "../src/Componenets/LoginForm";
import UserProfile from "./Componenets/UserProfile";
import Register from "./Componenets/RegisterForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Resources from "./Componenets/Resources";
import PersonalizeAdvice from "./Componenets/PersonalizeAdvice";
import Home from "./Componenets/Home";
import Booking from "./Componenets/Booking";
import Navbar from "./Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import Logout from "./Componenets/Logout";
import Verify from "./Componenets/Verify";
import RequestPasswordReset from "./Componenets/password/requestResetPassword";
import ResetPassword from "./Componenets/password/resetPassword";

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <ChakraProvider>
      <Router>
        <div>
          <Navbar token={token} />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/" element={<LoginForm />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/advice" element={<PersonalizeAdvice />} />
            <Route path="/home" element={<Home />} />
            <Route path="/expert" element={<Booking />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/verify" element={<Verify />} />
            <Route
              path="/request-password-reset"
              element={<RequestPasswordReset />}
            />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
