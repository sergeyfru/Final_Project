import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
// import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User, InitialState, EnumRegisterStatus } from "../../types/type.ts";
import axios from "axios";
const MYURL = 'https://final-project-htp7.onrender.com/api/users'

export const register = createAsyncThunk(`user/register`,
    async ({ u_firstname, u_lastname, u_email, p_password }: User, { rejectWithValue }) => {
        try {

            const response = await axios.post(`${MYURL}/register`,
                { u_firstname, u_lastname, u_email, p_password },
                { withCredentials: true }
            )

            console.log(response.data);

            return response.data

        } catch (error: any) {
            console.error('Error registering user:', error);

            // Check if error.response exists to get the error message
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }

    })

export const initialState: InitialState = {
    user: {
        u_id: '',
        u_firstname: '',
        u_lastname: '',
        u_email: '',
    },
    u_token: null,
    refreshToken: null,
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(register.pending, (state, ) => {
                state.status = EnumRegisterStatus.Loading
            })
            .addCase(register.rejected, (state, ) => {
                state.status = EnumRegisterStatus.Failed
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = EnumRegisterStatus.Success
                state.user = action.payload
            })

    }
})


export const { } = userSlice.actions



export default userSlice.reducer