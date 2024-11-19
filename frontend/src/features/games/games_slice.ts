import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    AddGameSliceType,
    BoardGame,
    DelMyGameType,
    EnumRegisterStatus,
    FilteringGamesType,
    GamesInitialState,
    JoinCollection,
    MyGames,
    SearchGamesType,
} from "../../types/type";
import axios from "axios";
import { callApi } from "../../service/CallApi";

const initialState: GamesInitialState = {
    allGames: [],
    filter: [],
    mygames: [],
    collectionWithFriends: [],
    status: EnumRegisterStatus.Success,
};

export const joinCollection = createAsyncThunk(
    "games/joincollection",
    async (data: JoinCollection) => {
        try {
            console.log(data);

            const response = await callApi("/games/friendscollection", "post", {
                data,
            });
            console.log(response.data);

            if (response.status !== 200) {
                alert(response.data.msg);
                return response.data;
            }
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Axios error", error.message);
                console.log("Axios error", error);
            } else {
                console.error("Unexpected error", error);
            }
        }
    }
);

export const getAllGames = createAsyncThunk("games/all", async () => {
    try {
        const response = await callApi("/games/all", "get", {});
        console.log("get all games");

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Axios error", error.message);
            console.log("Axios error", error);
        } else {
            console.error("Unexpected error", error);
        }
    }
});

export const delMyGame = createAsyncThunk(
    "games/delmygame",
    async (data: DelMyGameType) => {
        try {
            const afterDel = await callApi("/games/delmy", "post", { data });
            if (afterDel.status === 200) {
                alert(afterDel.data.msg);
            }
            console.log(afterDel);

            return afterDel.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Axios error", error.message);
                console.log("Axios error", error);
            } else {
                console.error("Unexpected error", error);
            }
        }
    }
);

export const myGames = createAsyncThunk(
    "games/mygames",
    async (data: MyGames) => {
        try {
            const response = await callApi("/games/mygames", "post", { data });

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Axios error", error.message);
                console.log("Axios error", error);
            } else {
                console.error("Unexpected error", error);
            }
        }
    }
);

export const addGameSlice = createAsyncThunk(
    "games/addgame",
    async (data: AddGameSliceType) => {
        try {
            const response = await callApi("/games/addgame", "post", { data });
            console.log("addGame slice response =>", response.data);
            alert(response.data.msg);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Axios error", error.message);
                console.log("Axios error", error);
            } else {
                console.error("Unexpected error", error);
            }
        }
    }
);

export const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        searchGames: (state, action: PayloadAction<SearchGamesType>) => {
            const searchGames: BoardGame[] = action.payload.allgames.filter(
                (game) => {
                    return game.name
                        .toLowerCase()
                        .includes(action.payload.userInput + "");
                }
            );
            // action.payload.setFilter(searchGames)
            state.filter = searchGames;
        },

        filteringGames: (state, action: PayloadAction<FilteringGamesType>) => {
            const inputSearch = action.payload.inputSearch;
            const inputCategory = action.payload.inputCategory;
            const inputMinTime = action.payload.inputMinTime;
            const inputMaxTime = action.payload.inputMaxTime;
            const inputmaxPlayerNumber = action.payload.inputMaxPlayerNumber;
            const inputminPlayerNumber = action.payload.inputMinPlayerNumber;

            state.filter = state.allGames;

            if (inputSearch && inputSearch !== "") {
                state.filter = state.filter.filter((game) => {
                    return game.name
                        .toLowerCase()
                        .includes(`${inputSearch.toString().toLowerCase()}`);
                });
            }
            if (inputCategory && inputCategory !== "") {
                console.log("inputCategory", inputCategory);

                state.filter = state.filter.filter(
                    (game) =>
                        game.boardgamecategory.toLowerCase() ===
                        inputCategory.toLowerCase()
                );
            }
            if (inputMinTime && inputMinTime !== "") {
                console.log("inputMinTime", typeof inputMinTime, inputMinTime);

                state.filter = state.filter.filter(
                    (game) => game.minplaytime >= parseInt(inputMinTime)
                );
            }
            if (inputMaxTime && inputMaxTime !== "") {
                console.log("inputMaxTime", typeof inputMaxTime, inputMaxTime);

                state.filter = state.filter.filter(
                    (game) => game.maxplaytime <= parseInt(inputMaxTime)
                );
            }
            if (inputminPlayerNumber && inputminPlayerNumber !== "") {
                console.log(
                    "inputminPlayerNumber",
                    typeof inputminPlayerNumber,
                    inputminPlayerNumber
                );

                state.filter = state.filter.filter(
                    (game) => game.minplayers <= parseInt(inputminPlayerNumber)
                );
            }
            if (inputmaxPlayerNumber && inputmaxPlayerNumber !== "") {
                console.log(
                    "inputmaxPlayerNumber",
                    typeof inputmaxPlayerNumber,
                    inputmaxPlayerNumber
                );

                state.filter = state.filter.filter(
                    (game) => game.maxplayers >= parseInt(inputmaxPlayerNumber)
                );
            }

            console.log(state.filter);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(joinCollection.pending, (state) => {
                state.status = EnumRegisterStatus.Loading;
            })
            .addCase(joinCollection.rejected, (state) => {
                state.status = EnumRegisterStatus.Failed;
            })
            .addCase(joinCollection.fulfilled, (state, action) => {
                state.status = EnumRegisterStatus.Success;
                state.collectionWithFriends = action.payload;
            })
            .addCase(getAllGames.pending, (state) => {
                state.status = EnumRegisterStatus.Loading;
            })
            .addCase(getAllGames.rejected, (state) => {
                state.status = EnumRegisterStatus.Failed;
            })
            .addCase(getAllGames.fulfilled, (state, action) => {
                state.status = EnumRegisterStatus.Success;
                state.allGames = action.payload;
                state.filter = action.payload;
            })
            .addCase(delMyGame.pending, (state) => {
                state.status = EnumRegisterStatus.Loading;
            })
            .addCase(delMyGame.rejected, (state) => {
                state.status = EnumRegisterStatus.Failed;
            })
            .addCase(delMyGame.fulfilled, (state, action) => {
                state.status = EnumRegisterStatus.Success;
                state.mygames = action.payload.newList;
            })
            .addCase(myGames.pending, (state) => {
                state.status = EnumRegisterStatus.Loading;
            })
            .addCase(myGames.rejected, (state) => {
                state.status = EnumRegisterStatus.Failed;
            })
            .addCase(myGames.fulfilled, (state, action) => {
                state.status = EnumRegisterStatus.Success;
                state.mygames = action.payload;
            })
            .addCase(addGameSlice.rejected, (state) => {
                state.status = EnumRegisterStatus.Failed;
            })
            .addCase(addGameSlice.pending, (state) => {
                state.status = EnumRegisterStatus.Loading;
            })
            .addCase(addGameSlice.fulfilled, (state) => {
                state.status = EnumRegisterStatus.Success;
            });
    },
});

export const { searchGames, filteringGames } = gamesSlice.actions;

export default gamesSlice.reducer;
