import { useSelector } from "react-redux";
import AdviceDisplay from "./advices/displayAdvice";
import PreferenceSettings from "./advices/preferences";
import { useState } from "react";
import UpdateProgress from "./advices/updateProgress";
import Advice from "./advices/advice";
import "../CSS/Routers/PersonalizeAdvice.css";

function PersonalizeAdvice() {
  const userProfile = useSelector((state) => state.profile);
  console.log(userProfile);

  return (
    <div className="personalize-advice-container">
      <div className="Advice">
        {" "}
        <AdviceDisplay profile={userProfile} />
      </div>{" "}
      <div className="btns">
        <PreferenceSettings />
        <UpdateProgress />
        <Advice />
      </div>
    </div>
  );
}

export default PersonalizeAdvice;
