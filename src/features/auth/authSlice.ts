import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

interface AuthState {
  userData: UserData;
  status: "idle" | "loading" | "failed";
  loginSuccess: boolean;
}

interface UserData {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

const initialState: AuthState = {
  userData: {
    id: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
    token: ""
  },
  loginSuccess: false,
  status: "idle"
};

export const authSignIn = createAsyncThunk("auth/signIn", async () => {
  const response = await axios.post("https://dummyjson.com/auth/login", {
    username: "kminchelle",
    password: "0lelplR"
  });
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSignOut: (state) => {
      state.loginSuccess = false;
      state.userData = {
        id: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        gender: "",
        image: "",
        token: ""
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authSignIn.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(authSignIn.fulfilled, (state, action) => {
      state.loginSuccess = true;
      state.userData = action.payload;
      state.status = "idle";
    });
    builder.addCase(authSignIn.rejected, (state, action) => {
      state.status = "failed";
    });
  }
});

export const { authSignOut } = authSlice.actions;
export const selectUserData = (state: RootState) => state.auth.userData;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectLoginSuccess = (state: RootState) => state.auth.loginSuccess;
export default authSlice.reducer;
