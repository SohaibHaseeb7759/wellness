import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const profileSlice = createSlice({
  name: "profile",
  initialState: null,
  reducers: {
    setProfile: (state, action) => action.payload,
    clearProfile: () => null,
    updatePreferences: (state, action) => {
      if (state) {
        state.preferences = action.payload;
      }
    },
    setAdvice: (state, action) => {
      state.advice = action.payload;
    },
  },
});

export const { setProfile, clearProfile, updatePreferences, setAdvice } =
  profileSlice.actions;

export const fetchProfile = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token"); // Retrieve token from storage
    const response = await axios.get(
      "http://localhost:5000/api/profiles/profiles", // Correct endpoint
      {
        headers: {
          "x-auth-token": token, // Pass token in request header
        },
      }
    );
    dispatch(setProfile(response.data));
  } catch (error) {
    console.error(
      "Error fetching profile:",
      error.response?.data || error.message
    );
  }
};
export const savePreferences = (categories, focusAreas) => async (dispatch) => {
  try {
    console.log(categories, focusAreas);
    const token = sessionStorage.getItem("token"); // Retrieve token from storage
    const response = await axios.put(
      "http://localhost:5000/api/advice/preferences",
      {
        categories,
        focusAreas,
      },
      {
        headers: {
          "x-auth-token": token, // Pass token in request header
        },
      }
    );
    console.log("Response Data:", response.data);
    const { preference, advice } = response.data;
    dispatch(updatePreferences(preference));
    dispatch(setAdvice(advice));
  } catch (error) {
    console.error("Error updating preferences:", error.response.data);
  }
};

export default profileSlice.reducer;
