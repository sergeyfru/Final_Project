import { Button, Stack } from "@mui/material"
import { useState } from "react"
import { useAppSelector } from "../../app/store"
import { BoardGame } from "../../types/type"


const RandomGame = () => {
    const [display, setMyDisplay] = useState<boolean>(false)
    const [randomGame,setRandomGame] =useState<BoardGame>()
    const collection = useAppSelector(state => state.gamesReducer.mygames)

        const selectionGame = () => {

            let randIndex = Math.floor(Math.random() * collection.length)
            setRandomGame(collection[randIndex])
            setMyDisplay(true)
            console.log('hi', display);
            console.log(randomGame);
    
    
        }
    return (
        <>
            <Button variant="contained" sx={{ m: 1 }} onClick={selectionGame}>Random Game</Button>
            {
                display &&(
                    <Stack className="randomGame">
                        <Button variant="contained" sx={{ m: 1 }} onClick={() => setMyDisplay(false)}>X</Button>
                        <h2>Your game is <br /> {randomGame?.name}</h2>
                        <img src={randomGame?.thumbnail} alt="" style={{ height: '200px' }} />

                        <Button variant="contained" sx={{ m: 1 }} onClick={selectionGame}>next</Button>
                    </Stack> 
            )}

        </>

    )
}

export default RandomGame