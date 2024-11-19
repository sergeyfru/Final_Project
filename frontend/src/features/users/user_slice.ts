import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
    User,
    InitialState,
    EnumRegisterStatus,
    InitialStatePayload,
} from "../../types/type.ts";
import axios from "axios";
import { callApi } from "../../service/CallApi.ts";

export const register = createAsyncThunk(
    "user/register",
    async (data: User) => {
        try {
            const response = await callApi("/users/register", "post", { data });

            console.log(response.data);

            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error", error.message);
                console.log("Axios error", error);
                return error;
            } else {
                console.error("Unexpected error", error);
            }
        }
    }
);

export const login = createAsyncThunk("user/login", async (data: User) => {
    console.log("in use slice=>");
    console.log("in use slice=>2");

    try {
        const response = await callApi("/users/login", "post", { data });
        console.log("response in use slice=>", response);

        if (response.status === 200) {
            console.log("user slice => status 200");
            localStorage.setItem("u_id", response.data.user.u_id);
            localStorage.setItem("u_token", response.data.u_token);
            localStorage.setItem("refresh", response.data.refreshToken);
            localStorage.setItem("firstname", response.data.user.u_firstname);
            localStorage.setItem("lastname", response.data.user.u_lastname);
            localStorage.setItem("isLoged", 'true');

            return response.data;
        }
        console.log("user_slice res.data=>", response.data);
        console.log("user_slice res=>", response);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error", error.message);
            console.log("Axios error", error);
            return error;
        } else {
            console.error("Unexpected error", error);
        }
    }
});

export const logOut = createAsyncThunk("users/logout", async () => {
    try {
        const response = await callApi("/users/logout", "get");

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Axios error", error);
            return error;
        } else {
            console.error("Unexpected error", error);
        }
    }
});

export const initialState: InitialState = {
    user: {
        u_id: "",
        u_firstname: "",
        u_lastname: "",
        u_email: "",
    },
    u_token: null,
    refreshToken: null,
    isLoged: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(logOut.pending, (state) => {
                state.status = EnumRegisterStatus.Loading;
            })
            .addCase(logOut.rejected, (state) => {
                state.status = EnumRegisterStatus.Failed;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.status = EnumRegisterStatus.Success;
                state.isLoged = false;
                (state.u_token = null), (state.refreshToken = null);
            })
            .addCase(register.pending, (state) => {
                state.status = EnumRegisterStatus.Loading;
            })
            .addCase(register.rejected, (state) => {
                state.status = EnumRegisterStatus.Failed;
            })
            .addCase(register.fulfilled, (state) => {
                state.status = EnumRegisterStatus.Success;
            })

            .addCase(login.pending, (state) => {
                state.status = EnumRegisterStatus.Loading;
            })
            .addCase(login.rejected, (state) => {
                state.status = EnumRegisterStatus.Failed;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<InitialStatePayload>) => {
                    state.status = EnumRegisterStatus.Success;
                    state.isLoged = true;
                    state.user = action.payload.user;
                    state.u_token = action.payload.u_token;
                    state.refreshToken = action.payload.refreshToken;
                }
            );
    },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
