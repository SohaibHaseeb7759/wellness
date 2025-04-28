import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducers/authSlice";
import profileReducer from "./Reducers/profileSlice";
import progressReducer from "./Reducers/progressSlice";
import expertReducer from "./Reducers/expertSlice"; // Adjust the path as needed
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    progress: progressReducer,
    expert: expertReducer,
  },
});

export default store;
