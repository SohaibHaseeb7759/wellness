import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../Reducers/authSlice";
import CreateProfile from "./profiles/CreateProfile";
import UpdateProfile from "./profiles/UpdateProfile";
import GetProfile from "./profiles/DisplayProfile";
import "../CSS/Routers/UserProfile.css";
import { fetchProfile } from "../Reducers/profileSlice";

function UserProfile() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.auth);
  const val = useSelector((state) => state.profile);

  const [createProfile, setCreateProfile] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);

  React.useEffect(() => {
    dispatch(getUserProfile());
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCreateProfileButton = () => {
    setCreateProfile(true);
  };

  const handleUpdateProfileButton = () => {
    setUpdateProfile(true);
  };

  console.log(profile);

  return (
    <>
      <div className="profile_container">
        <div className="profile_upper_portion">upper</div>
        <div className="profile_lower_portion">lower</div>
      </div>
      <div className="profile_middle_portion">
        {val ? (
          <>
            <div className="profile_username">Username: {profile.username}</div>
            <div className="profile_email">Email: {profile.email}</div>
            <GetProfile />
            <UpdateProfile />
          </>
        ) : (
          <div className="profile_create">
            {!createProfile && (
              <button onClick={handleCreateProfileButton} className="button">
                Create Profile
              </button>
            )}
            {createProfile && <CreateProfile />}
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfile;
