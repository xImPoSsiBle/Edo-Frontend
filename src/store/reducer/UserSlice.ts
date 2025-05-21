import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../models/User";
import { LoginUser, registerUser } from "./ActionCreators";

interface UserState {
    user: IUser | null,
    isAuth: boolean,
    isLoading: boolean
    error: string,
}

const initialState: UserState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: '',
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        register: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
        },
    },
    extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IUser>) => {
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
      .addCase(LoginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Ошибка при входе";
      });
  },
})

export default UserSlice.reducer
export const { login, logout } = UserSlice.actions;
