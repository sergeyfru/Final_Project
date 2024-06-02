import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { EnumRegisterStatus, GamesInitialState } from "../../types/type"
import axios from "axios";
import { MYURL } from "../../../../settings/settings";


const initialState: GamesInitialState = {
    allGames: [],
    mygames: [],
    status: EnumRegisterStatus.Success,
}

export const getAllGames = createAsyncThunk('games/all',
    async () => {
        try {

            const response = await axios.get(`${MYURL}/games/all`);

            console.log('games slice=>', response);
            console.log('games slice=>', response.data);

            return response.data;

        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.log('Axios error', error.message);
                console.log('Axios error', error);


            } else {
                console.error('Unexpected error', error);
            }

        }
    })

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getAllGames.pending, (state, ) => {
                state.status = EnumRegisterStatus.Loading
            })
            .addCase(getAllGames.rejected, (state, ) => {
                state.status = EnumRegisterStatus.Failed
            })
            .addCase(getAllGames.fulfilled,(state,action)=>{
                state.status = EnumRegisterStatus.Success
                state.allGames = action.payload
            })
    },
})


export const { } = gamesSlice.actions



export default gamesSlice.reducer