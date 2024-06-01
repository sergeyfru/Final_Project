import { Button, Stack } from "@mui/material"
import { BoardGame, RandomGameProps } from "../../types/type"
import { useState } from "react"


const RandomGame = ({ collection, }: RandomGameProps) => {
    const [display, setDisplay] = useState(false)
    const [game, setGame] = useState<BoardGame>(collection[0])
let randindex:number = -1

    const selectionGame = () => {
        randindex = Math.floor(Math.random() * collection.length)
        setGame(collection[randindex])
        setDisplay(true)
        

    }
    return (
        <>
            <Button variant="contained" sx={{ m: 1 }} onClick={selectionGame}>Random Game</Button>
            {
                display ?
                    <Stack className="randomGame">
                        <Button variant="contained" sx={{ m: 1 }} onClick={() => setDisplay(false)}>X</Button>
                        <h2>Your game is <br /> {game.name}</h2>
                        <img src={game.thumbnail} alt="" style={{ height:'200px' }} />

                        <Button variant="contained" sx={{ m: 1 }} onClick={selectionGame}>next</Button>
                    </Stack>
                    : <></>
            }

        </>

    )
}

export default RandomGame