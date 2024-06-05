import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AddFriend, EnumLoadingStatus, InitialStateFriends, User } from "../../types/type";

export const getAllUsers = createAsyncThunk('users/allusers',
    async ({ u_id }: User) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`,
                {
                    headers: {
                        'x-access-token': localStorage.u_token,
                        'x-refresh-token': localStorage.refresh,
                    },
                    withCredentials: true
                }
            )
            console.log(response.data);
            return { list: response.data, u_id }
        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.error('Axios error', error.message);
            } else {
                console.error('Unexpected error', error);
            }

        }
    }
)

export const initialState: InitialStateFriends = {
    allUsers: [],
    filteredUsers: [],
    myFriends: [],
    status: EnumLoadingStatus.Success
}
export const addFriend = createAsyncThunk('friends/addfriend',
    async ({ user_id_1, u2_email }: AddFriend) => {

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/friends/addfriend`,
                { user_id_1, u2_email },
                { withCredentials: true }
            )
            console.log(response.data);

            return response.data
        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.error('Axios error', error.message);
            } else {
                console.error('Unexpected error', error);
            }

        }
    }
)

export const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        searchUser: (state, action) => {
            state.filteredUsers = state.allUsers.filter(user => {
                const fullName = `${user.u_firstname} ${user.u_lastname}`
                if (fullName.toLowerCase().includes(`${action.payload}`)) {
                    return user
                }
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addFriend.pending, (state,) => {
                state.status = EnumLoadingStatus.Loading
            })
            .addCase(addFriend.rejected, (state,) => {
                state.status = EnumLoadingStatus.Failed
            })
            .addCase(addFriend.fulfilled, (state,) => {
                state.status = EnumLoadingStatus.Success
            })
            .addCase(getAllUsers.pending, (state,) => {
                state.status = EnumLoadingStatus.Loading
            })
            .addCase(getAllUsers.rejected, (state,) => {
                state.status = EnumLoadingStatus.Failed
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.status = EnumLoadingStatus.Success
                const withoutUser: User[] = action.payload?.list
                state.allUsers = withoutUser.filter(user => user.u_id != action.payload?.u_id)
                state.filteredUsers = withoutUser.filter(user => user.u_id != action.payload?.u_id)
            })


    }
})


export const {
    searchUser,
 } = friendsSlice.actions



export default friendsSlice.reducer