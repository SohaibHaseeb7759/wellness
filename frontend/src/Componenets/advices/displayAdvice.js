import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../CSS/PersonalAdvice/dsiplayAdvice..css";
const AdviceDisplay = ({ profile }) => {
  const [advice, setAdvice] = useState([]);
  console.log(profile);
  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/advice/generate",
          profile
        );
        setAdvice(response.data.advice);
        console.log(response.data.advice);
      } catch (error) {
        console.error("Error fetching advice:", error);
      }
    };

    fetchAdvice();
  }, [profile]);
  console.log(profile);
  return (
    <div className="display_container">
      <h2 className="display_h">Personalized Wellness Advice</h2>
      <ul className="display_ul">
        {advice.map((item, index) => (
          <>
            {" "}
            <li key={index} className="display_text">
              {item}
            </li>
            {/* <li>{profile.advice && profile.advice[0]}</li> */}
          </>
        ))}
      </ul>
      {profile.advice && profile.advice.length > 0 && (
        <ul>
          {profile.advice.map((adviceItem, adviceIndex) => (
            <li className="display_text" key={adviceIndex}>
              {adviceItem}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdviceDisplay;
