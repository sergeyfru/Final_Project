import { Button, Stack } from "@mui/material"
import { useState } from "react"
import { useAppSelector } from "../../app/store"
import { useRandomGame } from "./game_hook"


const RandomGame = () => {
    const [display, setDisplay] = useState(false)
    const collection = useAppSelector(state => state.gamesReducer.mygames)
    const randGame = useAppSelector(state => state.gamesReducer?.randomGame)
    const randomGame = useRandomGame()

    const selectionGame = () => {
        let gameIndex = -1

        if (randGame) {
            gameIndex = collection.findIndex(game => game.gameid === randGame.gameid)
        }
        while (true) {
            const randindex = Math.floor(Math.random() * collection.length)
console.log('in while');

            if (randindex !== gameIndex) {
                randomGame({ randindex })
                break
            }
        }
        setDisplay(true)

    }
    return (
        <>
            <Button variant="contained" sx={{ m: 1 }} onClick={selectionGame}>Random Game</Button>
            {
                display ?
                    <Stack className="randomGame">
                        <Button variant="contained" sx={{ m: 1 }} onClick={() => setDisplay(false)}>X</Button>
                        <h2>Your game is <br /> {randGame?.name}</h2>
                        <img src={randGame?.thumbnail} alt="" style={{ height: '200px' }} />

                        <Button variant="contained" sx={{ m: 1 }} onClick={selectionGame}>next</Button>
                    </Stack>
                    : <></>
            }

        </>

    )
}

export default RandomGame