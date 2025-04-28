import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    metrics: {},
    achievements: [],
    advice: "",
  },
  reducers: {
    setProgress: (state, action) => {
      state.metrics = action.payload.metrics;
      state.achievements = action.payload.achievements;
    },
    setAdvice: (state, action) => {
      state.advice = action.payload;
    },
  },
});

export const { setProgress, setAdvice } = progressSlice.actions;

export const updateProgress = (metrics, achievements) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.put(
      "http://localhost:5000/api/advice/progress",
      { metrics, achievements },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    dispatch(setProgress(response.data));
  } catch (error) {
    console.error(
      "Error updating progress:",
      error.response?.data || error.message
    );
  }
};

export const fetchAdvice = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:5000/api/advice/advice",
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    dispatch(setAdvice(response.data.advice));
  } catch (error) {
    console.error(
      "Error fetching advice:",
      error.response?.data || error.message
    );
  }
};

export default progressSlice.reducer;
