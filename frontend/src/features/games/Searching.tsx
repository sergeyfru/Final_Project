import { Stack, TextField } from "@mui/material"
import { useRef, } from "react"
import {  SearchingProps } from "../../types/type"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { searchGames } from "./games_slice"

const Searching = ({  }: SearchingProps) => {
    const searchRef = useRef<HTMLInputElement>(null)
    const allgames = useAppSelector(state => state.gamesReducer.allGames)
    const dispatch = useAppDispatch()

    const searchFunc = () => {
        console.log(searchRef);
        console.log(searchRef.current);
        const userInput = searchRef.current?.value.toLowerCase().trim()

        dispatch(searchGames({ userInput,  allgames }))
        // const searchGames: BoardGame[] = allgames.filter(game => {
        //     return game.name.toLowerCase().includes(userInput + '')
        // })
        // console.log(searchGames);

        // setFilter?.(searchGames)


    }

    return (
        <Stack>
            <TextField
                sx={{ m: 1 }}
                id='search'
                type="text"
                label='Search game'
                variant="outlined"
                onChange={searchFunc}
                inputRef={searchRef}
            />


        </Stack>
    )
}

export default Searching