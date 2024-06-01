import { useEffect, useState, } from "react"
import { BoardGame } from '../../types/type.ts'
import axios from "axios"
import { MYURL } from "../../../settings.ts"
import { Search } from "react-router-dom"
import Searching from "./Searching.tsx"

const Game = () => {
    const [allgames, setGames] = useState<BoardGame[]>([])
    const [filter, setFilter] = useState<BoardGame[]>([])

    // const getGame = async () => {
    //     // const resp = await fetch('https://boardgamegeek.com/browse/boardgame')
    //     const response = await axios.get('https://bgg-json.azurewebsites.net/collection/edwalter',
    //         {
    //             // headers: {
    //             //     'x-refresh-token': token?.u_token
    //             // },
    //             // withCredentials: true
    //         }
    //     )

    //     // const data = await resp.json()
    //     console.log(response.data);
    //     setGames(response.data)
    // }
    const getGame = async () => {
        try {

            const response = await axios.get(`${MYURL}/games/all`);

            const newArr = response.data;
            setFilter(newArr)
            setGames(newArr)

        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.log('Axios error', error.message);
                console.log('Axios error', error);


            } else {
                console.error('Unexpected error', error);
            }

        }
    }



    const addGame = async (game: BoardGame) => {
        try {
            const u_id = localStorage.getItem("u_id")
            const gameid = game.gameid
            const response = await axios.post(`${MYURL}/games/addgame`,
                { u_id, gameid },
                { withCredentials: true }
            )
            console.log(response.data);
            alert(response.data.msg)

        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.error('Axios error', error.message);
                console.log('Axios error', error);
                return error

            } else {
                console.error('Unexpected error', error);
            }

        }

    }
    useEffect(() => {
        getGame()
    }, [])

    return (
        <>
            <h3>All games {filter.length}</h3>
            <Searching allgames={allgames} filter={filter} setFilter={setFilter} />
            {/* <button onClick={getGame}>get</button> */}
            {
                filter.map((item, i) => {
                    // return <h2 key={i}>{item.u_id}</h2>
                    return (
                        <div key={i} style={{display:"flex", border:'1px solid black', margin:'4px'}}>
                            <div>
                                <h2>{item.name}</h2>
                                {/* <img src={item.image} alt="" /> */}
                                <img src={item.thumbnail} alt="" />
                            </div>
                            <div style={{marginLeft:'auto'}}>
                                <h4>Rating: {item.averagerating}</h4>
                                <h4> Number of players: {item.minplayers} - {item.maxplayers}</h4>
                                <button onClick={() => addGame(item)}>Add to my collection</button>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
export default Game