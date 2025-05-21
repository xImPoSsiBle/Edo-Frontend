import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser } from "../../models/User";
import axios from "axios";



export const registerUser = createAsyncThunk<
    IUser,
    { username: string; email: string; password: string },
    { rejectValue: string }
>(
    "user/registerUser",
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", credentials);
            console.log(response.data)
            return response.data as IUser;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

export const LoginUser = createAsyncThunk<
    IUser,
    { email: string; password: string },
    { rejectValue: string }
>(
    "user/LoginUser",
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", credentials);
            return response.data as IUser;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);