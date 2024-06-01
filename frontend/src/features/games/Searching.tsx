import { Stack, TextField } from "@mui/material"
import {  useRef,  } from "react"
import { BoardGame, SearchingProps } from "../../types/type"

const Searching = ({ allgames, setFilter }: SearchingProps) => {
    const searchRef = useRef<HTMLInputElement>(null)


    const searchFunc = () => {
        
        console.log(searchRef);
        console.log(searchRef.current);
        const userInput = searchRef.current?.value.toLowerCase().trim()
        const searchGames: BoardGame[] = allgames.filter(game => {
                    return game.name.toLowerCase().includes(userInput + '')
                })
                console.log(searchGames);
    
                setFilter?.(searchGames)
    

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