import React, { useEffect,  } from "react"
import { BoardGame } from '../../types/type.ts'
import axios from "axios"
import Searching from "./Searching.tsx"
import { getAllGames } from "./games_slice.ts"
import { MYURL } from "../../../../settings/settings.ts"
import { useAppDispatch, useAppSelector } from "../../app/store.ts"
import { useGetAllGames } from "./game_hook.ts"


const Game = () => {

const dispatch = useAppDispatch()

const allgames:BoardGame[] = useAppSelector(state => state.gamesReducer.allGames)
   
    const getGame = async () => {
        
        try {

            const response = await dispatch(getAllGames())

            console.log(response);
            
            // const newArr = response.d;
            // setFilter(newArr)
            // setGames(newArr)

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
        getGame(),
        console.log(allgames);

    }, [])

    return (
        <>
            <h3>All games {allgames.length}</h3>
            <Searching allgames={allgames} />

            <button onClick={getGame}>get</button>
            {
                allgames.map((item, i) => {
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
export default React.memo(Game)