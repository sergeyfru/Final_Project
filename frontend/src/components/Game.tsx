import { useState, useContext } from "react"
import { BoardGame } from '../types/type.ts'
import axios from "axios"

const Game = () => {
    const [games, setGames] = useState<BoardGame[]>([])
    
    const getGame = async () => {
        // const resp = await fetch('https://boardgamegeek.com/browse/boardgame')
        const resp = await axios.get('https://bgg-json.azurewebsites.net/collection/edwalter',
            {
                headers:{
                    'x-refresh-token': token?.u_token
                }
            }
        )




        // const data = await resp.json()
        // console.log(data);
        // setGames(data)
    }
    return (
        <>
            <h3>game</h3>
            <button onClick={getGame}>get</button>
            {
                games.map(item => {
                    return (
                        <div key={item.gameId}>
                            <h2>{item.name}</h2>
                            {/* <img src={item.image} alt="" /> */}
                            <img src={item.thumbnail} alt="" />
                        </div>
                    )
                })
            }
        </>
    )
}
export default Game