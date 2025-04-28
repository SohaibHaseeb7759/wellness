import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../CSS/Resourses/allresourses.css";
function AllResources() {
  const [nutritionData, setNutritionData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getNutritionInfo(query) {
    const options = {
      method: "POST",
      url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
      headers: {
        "x-app-id": "3999a709",
        "x-app-key": "22291dfb4b394264f8c68259f61f93d6",
        "Content-Type": "application/json",
      },
      data: {
        query: query,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.foods;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("submitted");
    setLoading(true);
    setError(null);
    try {
      const data = await getNutritionInfo(query);
      setNutritionData(data);
      console.log(nutritionData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div id="wifi-loader">
        <svg className="circle-outer" viewBox="0 0 86 86">
          <circle className="back" cx="43" cy="43" r="40"></circle>
          <circle className="front" cx="43" cy="43" r="40"></circle>
          <circle className="new" cx="43" cy="43" r="40"></circle>
        </svg>
        <svg className="circle-middle" viewBox="0 0 60 60">
          <circle className="back" cx="30" cy="30" r="27"></circle>
          <circle className="front" cx="30" cy="30" r="27"></circle>
        </svg>
        <svg className="circle-inner" viewBox="0 0 34 34">
          <circle className="back" cx="17" cy="17" r="14"></circle>
          <circle className="front" cx="17" cy="17" r="14"></circle>
        </svg>
        <div className="text" data-text="Searching"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="resourses_h2">Nutrition Information</h2>

      <form onSubmit={handleSearch}>
        <div class="search">
          <div class="search-box">
            <div class="search-field">
              <input
                placeholder="Enter any food name"
                class="input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div class="search-box-icon">
                <button class="btn-icon-content" type="submit">
                  <i class="search-icon">
                    <svg
                      xmlns="://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                        fill="#fff"
                      ></path>
                    </svg>
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ul className="resourses_ul">
        {nutritionData.map((food, index) => (
          <li key={index} className="resourses_li">
            <h3 className="resourses_h3">"{food.food_name}"</h3>
            <p className="resourses_p">Calories: {food.nf_calories}</p>
            <p className="resourses_p">Protein: {food.nf_protein}g</p>
            <p className="resourses_p">Fat: {food.nf_total_fat}g</p>
            <p className="resourses_p">
              Carbohydrates: {food.nf_total_carbohydrate}g
            </p>
            <p className="resourses_p">Cholesterol: {food.nf_cholesterol}g</p>
            <p className="resourses_p">Fiber: {food.nf_dietary_fiber}g</p>
            <p className="resourses_p">Potassium: {food.nf_potassium}g</p>
            <p className="resourses_p">Protein: {food.nf_protein}g</p>
            <p className="resourses_p">
              Saturated Fat: {food.nf_saturated_fat}g
            </p>
            <p className="resourses_p">Sugar: {food.nf_sugars}g</p>

            <p className="resourses_p">Total Fat: {food.nf_total_fat}g</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllResources;
