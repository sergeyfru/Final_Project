import { createSlice } from "@reduxjs/toolkit";
import {  InitialStateSelector } from "../../types/type";

const initialState: InitialStateSelector = {
    category: [],
    inputSearch:null,
    inputcategory: null,
    inputminTime: null,
    inputmaxTime: null,
    inputmaxPlayerNumber: null,
    inputminPlayerNumber: null,
}

export const selectorSlice = createSlice({
    name: 'slector',
    initialState,
    reducers: {
        getCategories: (state, action) => {
            const allGames = action.payload
            const newCategory: string[] = []

            for (const game of allGames) {

                if (!newCategory.includes(game.boardgamecategory)) {
                    if (game.boardgamecategory) {
                        newCategory.push(game.boardgamecategory)
                    }
                }
            }
            state.category = newCategory.sort(({ a, b }: any) => a - b)
        },
        
        setSearch: (state, action) => {
            state.inputSearch = action.payload.toLowerCase().trim()
        },
        setMinTime: (state, action) => {
            state.inputminTime = action.payload
        },
        setMaxTime: (state, action) => {
            state.inputmaxTime = action.payload
        },
        setMaxPlayerNumber: (state, action) => {
            state.inputmaxPlayerNumber = action.payload
        },
        setMinPlayerNumber: (state, action) => {
            state.inputminPlayerNumber = action.payload
        },
        setCategory: (state, action) => {
            state.inputcategory = action.payload.toLowerCase().trim()
        },
    }

})

export const {
    getCategories,
    setSearch,
    setCategory,
    setMaxPlayerNumber,
    setMaxTime,
    setMinPlayerNumber,
    setMinTime
} = selectorSlice.actions



export default selectorSlice.reducer