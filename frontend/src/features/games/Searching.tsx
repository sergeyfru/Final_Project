import { TextField, Button, Stack } from "@mui/material"
import { useRef } from "react"
import { BoardGame, SearchingProps } from "../../types/type"

const Searching = ({ allgames, filter, setFilter }: SearchingProps) => {
    const searchRef = useRef<HTMLInputElement>(null)


    const search = () => {
        console.log(searchRef);
        console.log(searchRef.current);

        const userInput = searchRef.current?.value.toLowerCase().trim()
        console.log(userInput);

        const searchGames: BoardGame[] = allgames.filter(game => {
            return game.name.toLowerCase().includes(userInput+'')
        })
        console.log(searchGames);

        setFilter(searchGames)
    }

    return (
        <Stack>
            <input placeholder="Search game" onChange={search} ref={searchRef} />


        </Stack>
    )
}

export default Searching