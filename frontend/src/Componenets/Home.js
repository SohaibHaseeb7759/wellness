import "../../src/CSS/Routers/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div className="Home_con">
      <h5 className="Home_h5">WELLNESS WISE APP</h5>
      <h2 className="Home_h2">Find doctors. Get Best Advice. Stay Healthy.</h2>
      <h3 className="Home_h3">
        "He who has health has hope, and he who has hope has everything"
      </h3>
      <button className="button" onClick={handleClick}>
        Lets get Started{" "}
      </button>
    </div>
  );
}

export default Home;
