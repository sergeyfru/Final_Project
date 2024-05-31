import { useState, } from "react"
import { BoardGame } from '../../types/type.ts'
import axios from "axios"
import { MYURL } from "../../../settings.ts"

const Game = () => {
    const [allgames, setGames] = useState<BoardGame[]>([])

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
            const u_id = localStorage.getItem('u_id')
            console.log(u_id);

            const response = await axios.get(`${MYURL}/games/all`);

            console.log(response.data);
            const newArr = response.data
            console.log(newArr);
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


    const logGame = () => {
        // console.log(allgames);
        
        for(let i = 0; i<allgames.length;i++){
            console.log(allgames[i]);
            
        }
    }

    const addGame = async (game: BoardGame) => {
        try {
            const u_id = localStorage.getItem("u_id")
            const gameid = game.gameid
            const response = await axios.post(`${MYURL}/games/addgame`,
                {u_id,gameid},
                {withCredentials: true}
            )
            console.log(response.data);
            

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


    return (
        <>
            <h3>All games {allgames.length}</h3>
            <button onClick={getGame}>get</button>
            <button onClick={logGame}>log</button>
            {
                allgames.map((item, i) => {
                    // return <h2 key={i}>{item.u_id}</h2>
                    return (
                        <div key={i}>
                            <h2>{item.name}</h2>
                            {/* <img src={item.image} alt="" /> */}
                            <img src={item.thumbnail} alt="" />
                            <button onClick={() => addGame(item)}>Add to my collection</button>
                        </div>
                    )
                })
            }
        </>
    )
}
export default Game