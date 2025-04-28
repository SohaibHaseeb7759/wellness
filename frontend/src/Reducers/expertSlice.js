// src/reducers/expertSlice.js
import { createSlice } from "@reduxjs/toolkit";

const expertSlice = createSlice({
  name: "expert",
  initialState: {
    name: "",
    expertise: "",
    bio: "",
    availability: [],
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setExpertise(state, action) {
      state.expertise = action.payload;
    },
    setBio(state, action) {
      state.bio = action.payload;
    },
    setAvailability(state, action) {
      state.availability = action.payload;
    },
    clearForm(state) {
      state.name = "";
      state.expertise = "";
      state.bio = "";
      state.availability = [];
    },
  },
});

export const { setName, setExpertise, setBio, setAvailability, clearForm } =
  expertSlice.actions;
export default expertSlice.reducer;
