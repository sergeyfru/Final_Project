import {  Stack, TextField } from "@mui/material"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { setSearch } from "./selector_slice"
import { filteringGames } from "../games/games_slice"

const SearchGame = () => {
    const dispatch = useAppDispatch()
    
    const inputCategory = useAppSelector(state => state.selectorReducer.inputcategory)
    const inputMinTime = useAppSelector(state => state.selectorReducer.inputminTime)
    const inputMaxTime = useAppSelector(state => state.selectorReducer.inputmaxTime)
    const inputMaxPlayerNumber = useAppSelector(state => state.selectorReducer.inputmaxPlayerNumber)
    const inputMinPlayerNumber = useAppSelector(state => state.selectorReducer.inputminPlayerNumber)



    const searchFunc =async (event: React.ChangeEvent<HTMLInputElement>) => {
         dispatch(setSearch(event.target.value))
dispatch(filteringGames({inputSearch:event.target.value,inputCategory, inputMaxTime, inputMinTime,  inputMaxPlayerNumber, inputMinPlayerNumber}))
    }

    return (
        <Stack>
            <TextField
                sx={{ m: 1 }}
                id='search'
                type="search"
                label='Search game'
                variant="outlined"
                onChange={searchFunc}
            />


        </Stack>
    )
}

export default React.memo(SearchGame)