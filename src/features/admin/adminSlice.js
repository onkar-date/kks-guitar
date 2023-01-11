import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ACTION_STATUS } from "../../shared/constants/actionStatusConstants";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  isLoggedIn: false,
  firstName: "",
  lastName: "",
  status: ACTION_STATUS.idle,
  error: null,
};

export const login = createAsyncThunk("admin/login", async (credentials) => {
  console.log(credentials);
  const response = await axios.post(`${BASE_URL}/admin`, credentials);
  return response.data;
});

export const adminSlice = createSlice({
  initialState,
  name: "admin",
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = ACTION_STATUS.loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = ACTION_STATUS.success;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = ACTION_STATUS.failed;
        state.firstName = "";
        state.lastName = "";
        state.isLoggedIn = false;
        state.error = action.error.message;
      });
  },
});

export const selectIsLoggedIn = (state) => state.adminState.isLoggedIn;
export const selectName = (state) =>
  `${state.adminState.firstName} ${state.adminState.lastName}`;
export const selectLoggedInStatus = (state) => state.adminState.status;
export const selectLoggedInError = (state) => state.adminState.error;

export default adminSlice.reducer;
