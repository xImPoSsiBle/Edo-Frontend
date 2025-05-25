import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserResponse } from "../../models/User";
import axios from "axios";
import type { IDoc } from "../../models/Document";

export const registerUser = createAsyncThunk<
    UserResponse,
    { username: string; email: string; password: string },
    { rejectValue: string }
>(
    "user/registerUser",
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", credentials);
            console.log(response.data)
            return response.data as UserResponse;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);


export const LoginUser = createAsyncThunk<
    UserResponse,
    { email: string; password: string },
    { rejectValue: string }
>(
    "user/LoginUser",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", { email, password }, { withCredentials: true });
            return response.data as UserResponse;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);


export const getDocs = createAsyncThunk<
    IDoc[],
    string,
    { rejectValue: string }
>(
    "document/getInboxDocs",
    async (path, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get<IDoc[]>(`http://localhost:8080/api/docs${path}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);


export const getDocsById = createAsyncThunk<
    IDoc,
    string,
    { rejectValue: string }
>(
    "document/getDocsById",
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get<IDoc>(`http://localhost:8080/api/docs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data)
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Ошибка при получении документа");
        }
    }
);