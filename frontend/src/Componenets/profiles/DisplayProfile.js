import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Reducers/profileSlice";
import "../../CSS/Profile/displayProfile.css";
const GetProfile = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile()); // Fetch profile when component mounts
  }, [dispatch]);

  return (
    <div className="display_profile_container">
      {profile && (
        <>
          {" "}
          <div className="display_profile_pic_box">
            {" "}
            <img
              src={`http://localhost:5000/${profile.profilePicture}`}
              alt="Profile"
              className="display_profile_pic"
            />
          </div>
          <div className="display_profile_box">
            <h3 className="display_profile_h3">
              <span className="span"> {profile.firstName} </span>
              {profile.lastName}
            </h3>
            <p className="display_profile_age display_profile_p">
              Age : {profile.age}
            </p>
            <p className="display_profile_gender display_profile_p">
              Gender : {profile.gender}
            </p>
            <p className="display_profile_healthCondition display_profile_p">
              Health Condition : {profile.healthCondition}
            </p>
            <p className="display_profile_goal display_profile_p">
              Personal Goal : {profile.wellnessGoals}
            </p>

            <ul className="display_profile_ul">
              {profile.achievements.map((achievement, index) => (
                <li key={index} className="display_profile_li">
                  Title :
                  <strong className="display_profile_title">
                    {achievement.title}
                  </strong>
                  {achievement.description} on{" "}
                  {new Date(achievement.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default GetProfile;
