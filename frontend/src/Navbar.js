import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../src/CSS/Routers/Navbar.css";
import logout from "../src/Assets/logout.png";
import {
  Avatar,
  AvatarGroup,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

function Navbar({ token }) {
  const location = useLocation();
  const [hasVisitedProfile, setHasVisitedProfile] = useState(
    sessionStorage.getItem("hasVisitedProfile") === "true"
  );

  useEffect(() => {
    if (location.pathname === "/profile" && !hasVisitedProfile) {
      setHasVisitedProfile(true);
      sessionStorage.setItem("hasVisitedProfile", "true");
    }
  }, [location.pathname, hasVisitedProfile]);

  // Render the Navbar only if the user has visited the "/profile" page
  if (!hasVisitedProfile) {
    return null;
  }

  return (
    <div className="navbar">
      <ul>
        {token ? (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/resources">Wellness Resources</Link>
            </li>
            <li>
              <Link to="/advice">Personalize Advice</Link>
            </li>
            <li>
              <Link to="/expert">Expert Connections</Link>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
      <div className="greeting">
        <Menu>
          <MenuButton as={Button} colorScheme="black" fontSize={"1.8rem"}>
            Profile
          </MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem
                style={{ color: "black" }}
                as={Link}
                to="/profile"
                gap={"1rem"}
              >
                <AvatarGroup>
                  <Avatar
                    src="https://bit.ly/broken-link"
                    size={"sm"}
                    border="2px solid #4caf50"
                  />
                </AvatarGroup>
                My Account
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem style={{ color: "black" }} as={Link} to="/logout">
                <img
                  src={logout}
                  alt="logout"
                  style={{ width: "30px", height: "30px", marginRight: "18px" }}
                />
                Logout
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
