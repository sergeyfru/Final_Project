import React, { useEffect, useState, } from "react"
import { BoardGame } from '../../types/type.ts'
import axios from "axios"
import Searching from "./Searching.tsx"
import { useAppDispatch, useAppSelector } from "../../app/store.ts"
import { addGameSlice } from "./games_slice.ts"
import { useGetAllGames } from "./game_hook.ts"


const Game = () => {
    const [filter, setFilter] = useState<BoardGame[]>([])
    const dispatch = useAppDispatch()
    const GetAllGames = useGetAllGames()
    const allgames = useAppSelector(state => state.gamesReducer.allGames)

    const filter2: BoardGame[] = useAppSelector(state => state.gamesReducer.filter)
    useEffect(() => {
        if (allgames.length === 0) {
            console.log(allgames)
            getGame()
        }


        // const games = useAppSelector(state => state.gamesReducer.allGames)

    }, [])
    const getGame = async () => {

        try {
            GetAllGames({ filter, setFilter })


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

            dispatch(addGameSlice({ u_id, gameid }))

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
            <h3>All games {filter2.length}</h3>
            <Searching filter={filter} setFilter={setFilter} />

            <button onClick={getGame}>get</button>
            {
                filter2.map((item,) => {
                    // return <h2 key={i}>{item.u_id}</h2>
                    return (
                        <div key={item.gameid} style={{ display: "flex", border: '1px solid black', margin: '4px' }}>
                            <div>
                                <h2>{item.name} {item.gameid}</h2>
                                {/* <img src={item.image} alt="" /> */}
                                <img src={item.thumbnail} alt="" />
                                <p>{item.description}</p>
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                                <h4>Rating: {item.averagerating}</h4>
                                <h4>Number of players: {item.minplayers} - {item.maxplayers}</h4>
                                <h4>Time for play: {item.minplaytime} - {item.maxplaytime} </h4>
                                <h4>Category: {item.boardgamecategory}</h4>
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