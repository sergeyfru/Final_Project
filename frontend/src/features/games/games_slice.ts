import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AddGameSliceType, BoardGame, EnumRegisterStatus, GamesInitialState, SearchGamesType, SearchingProps } from "../../types/type"
import axios from "axios";
import { MYURL } from "../../../../settings/settings";


const initialState: GamesInitialState = {
    allGames: [],
    filter:[],
    mygames: [],
    status: EnumRegisterStatus.Success,
}

export const getAllGames = createAsyncThunk('games/all',
    async ({ setFilter }: SearchingProps) => {
        try {

            const response = await axios.get(`${MYURL}/games/all`);

            console.log('games slice=>', response);
            console.log('games slice=> data', response.data);

            setFilter(response.data)

            return response.data;

        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.log('Axios error', error.message);
                console.log('Axios error', error);


            } else {
                console.error('Unexpected error', error);
            }

        }
    }
)


export const addGameSlice = createAsyncThunk('games/addgame',
    async ({ u_id, gameid }: AddGameSliceType) => {
        try {

            const response = await axios.post(`${MYURL}/games/addgame`,
                { u_id, gameid },
                { withCredentials: true }
            )
            console.log('addGame slice response =>', response.data);
            alert(response.data.msg)
            return response

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Axios error', error.message);
                console.log('Axios error', error);


            } else {
                console.error('Unexpected error', error);
            }
        }
    }
)

export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        searchGames:(state,action:PayloadAction<SearchGamesType>)=>{
            const searchGames: BoardGame[] = action.payload.allgames.filter(game => {
                return game.name.toLowerCase().includes(action.payload.userInput + '')
            })
            // action.payload.setFilter(searchGames)
            state.filter = searchGames
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAllGames.pending, (state,) => {
                state.status = EnumRegisterStatus.Loading
            })
            .addCase(getAllGames.rejected, (state,) => {
                state.status = EnumRegisterStatus.Failed
            })
            .addCase(getAllGames.fulfilled, (state, action) => {
                state.status = EnumRegisterStatus.Success
                state.allGames = action.payload
                state.filter = action.payload
            })
            .addCase(addGameSlice.rejected, (state,) => {
                state.status = EnumRegisterStatus.Failed
            })
            .addCase(addGameSlice.pending, (state,) => {
                state.status = EnumRegisterStatus.Loading
            })
            .addCase(addGameSlice.fulfilled, (state,) => {
                state.status = EnumRegisterStatus.Success

            })
    },
})


export const {
    searchGames,

 } = gamesSlice.actions



export default gamesSlice.reducer