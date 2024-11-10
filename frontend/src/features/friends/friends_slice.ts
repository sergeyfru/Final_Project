import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
    AddFriend,
    EnumLoadingStatus,
    InitialStateFriends,
    User,
} from "../../types/type";
import { callApi } from "../../service/CallApi";

export const getAllUsers = createAsyncThunk(
    "users/allusers",
    async ({ u_id }: User) => {
        try {
            const response = await callApi("/users", "get", {
                config: {
                    headers: {
                        "x-access-token": localStorage.u_token,
                        "x-refresh-token": localStorage.refresh,
                    },
                },
            });
            console.log(response.data);
            return { list: response.data, u_id };
        } catch (error) {
            console.log("in USER ERROR");

            if (axios.isAxiosError(error)) {
                console.log("Axios error", error);
            } else {
                console.error("Unexpected error", error);
            }
        }
    }
);

export const deleteFriend = createAsyncThunk(
    "friends/delfriend",
    async (data: AddFriend) => {
        try {
            const response = await callApi("/friends/delfriend", "delete", {
                data,
            });
            console.log(response.data);

            if (response.status === 200) {
                alert(response.data.msg);

                return response.data;
            } else {
                alert(response.data?.msg);
                return response.data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error", error.message);
            } else {
                console.error("Unexpected error", error);
            }
        }
    }
);

export const confirmFriendship = createAsyncThunk(
    "friends/confirmfriend",
    async (data: AddFriend) => {
        try {
            const response = await callApi("/friends/confirmfriend", "put", {
                data,
            });
            console.log(response.data);

            if (response.status === 200) {
                alert(response.data.msg);

                return response.data;
            } else {
                alert(response.data?.msg);
                return response.data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error", error.message);
            } else {
                console.error("Unexpected error", error);
            }
        }
    }
);

export const addFriend = createAsyncThunk(
    "friends/addfriend",
    async (data: AddFriend) => {
        try {
            const response = await callApi("/friends/addfriend", "post", {
                data,
            });
            console.log(response.data);

            if (response.status === 200) {
                return response.data;
            } else {
                alert(response.data?.msg);
                return response.data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error", error.message);
            } else {
                console.error("Unexpected error", error);
            }
        }
    }
);
export const allMyFrinds = createAsyncThunk(
    "friends/allmyfriends",
    async (data: User) => {
        try {
            const response = await callApi("/friends/allmyfriends", "post", {
                data,
            });
            console.log(response.data);

            if (response.status === 200) {
                return response.data;
            } else {
                alert(response.data?.msg);
                return response.data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error", error.message);
            } else {
                console.error("Unexpected error", error);
            }
        }
    }
);

export const initialState: InitialStateFriends = {
    allUsers: [],
    filteredUsers: [],
    myFriends: [],
    status: EnumLoadingStatus.Success,
};

export const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        searchUser: (state, action) => {
            state.filteredUsers = state.allUsers.filter((user) => {
                const fullName = `${user.u_firstname} ${user.u_lastname}`;
                if (
                    fullName
                        .toLowerCase()
                        .includes(`${action.payload.toLowerCase()}`)
                ) {
                    return user;
                }
            });
        },
    },
    extraReducers(builder) {
        builder
            .addCase(confirmFriendship.pending, (state) => {
                state.status = EnumLoadingStatus.Loading;
            })
            .addCase(confirmFriendship.rejected, (state) => {
                state.status = EnumLoadingStatus.Failed;
            })
            .addCase(confirmFriendship.fulfilled, (state, action) => {
                state.status = EnumLoadingStatus.Success;
                state.myFriends = action.payload.myNewFriendsList;
            })
            .addCase(deleteFriend.pending, (state) => {
                state.status = EnumLoadingStatus.Loading;
            })
            .addCase(deleteFriend.rejected, (state) => {
                state.status = EnumLoadingStatus.Failed;
            })
            .addCase(deleteFriend.fulfilled, (state, action) => {
                state.status = EnumLoadingStatus.Success;
                state.myFriends = action.payload.myNewFriendsList;
            })
            .addCase(allMyFrinds.pending, (state) => {
                state.status = EnumLoadingStatus.Loading;
            })
            .addCase(allMyFrinds.rejected, (state) => {
                state.status = EnumLoadingStatus.Failed;
            })
            .addCase(allMyFrinds.fulfilled, (state, action) => {
                state.status = EnumLoadingStatus.Success;
                state.myFriends = action.payload;
            })
            .addCase(addFriend.pending, (state) => {
                state.status = EnumLoadingStatus.Loading;
            })
            .addCase(addFriend.rejected, (state) => {
                state.status = EnumLoadingStatus.Failed;
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                state.status = EnumLoadingStatus.Success;
                state.myFriends = action.payload;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.status = EnumLoadingStatus.Loading;
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.status = EnumLoadingStatus.Failed;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.status = EnumLoadingStatus.Success;
                const withoutUser: User[] = action.payload?.list;
                state.allUsers = withoutUser.filter(
                    (user) => user.u_id != action.payload?.u_id
                );
                state.filteredUsers = withoutUser.filter(
                    (user) => user.u_id != action.payload?.u_id
                );
            });
    },
});

export const { searchUser } = friendsSlice.actions;

export default friendsSlice.reducer;
