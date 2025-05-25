import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserResponse } from "../../models/User";
import { LoginUser, registerUser } from "./ActionCreators";
import { useNavigate } from "react-router-dom";

interface UserState {
  user: { email: string; username: string } | null,
  isAuth: boolean,
  isLoading: boolean
  error: string,
  token: string | null,
}

const savedToken = localStorage.getItem('token');
const savedUser = localStorage.getItem('user');


const initialState: UserState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken,
  isAuth: Boolean(savedToken),
  isLoading: false,
  error: '',
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка при входе";
      })
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(LoginUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.isLoading = false;
        state.user = { email: action.payload.email, username: action.payload.username };
        console.log(action.payload.username, action.payload.email)
        state.token = action.payload.token;
        state.isAuth = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify({
          email: action.payload.email,
          username: action.payload.username,
        }));
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка при входе";
      });
  },
})

export default UserSlice.reducer
export const { logout } = UserSlice.actions;
