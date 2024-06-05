import React, { useEffect,  } from "react"
import {  EnumRegisterStatus } from "../../types/type"

import DelMyGame from "./DelMyGame.tsx"
import RandomGame from "./RandomGame.tsx"
import { useAppSelector } from "../../app/store.ts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { useGetMyGames } from "./game_hook.ts"


const MyCollection = () => {
    const collection = useAppSelector(state => state.gamesReducer.mygames)
    const gameStore = useAppSelector(state => state.gamesReducer)
    const getMyGames = useGetMyGames()
    const u_id = localStorage.getItem('u_id')

    const myGames = async () => {
        getMyGames({u_id})

    }

    useEffect(() => {
        myGames()
    }, [gameStore.randomGame])

    return (
        <>
            <h2>My Collection: {collection.length}</h2>
            {
                gameStore.status === EnumRegisterStatus.Loading ? <FontAwesomeIcon icon={faSpinner} spinPulse style={{ fontSize: "64px" }} /> :

                    <>
                        <RandomGame  />
                        {
                            collection.map(game => {
                                return (
                                    <div key={game.gameid}>
                                        <h2>{game.name}</h2>
                                        <h3>{game.description}</h3>
                                        <img src={game.thumbnail} alt="" />
                                        <DelMyGame gameid={game.gameid} />
                                    </div>
                                )
                            })

                        }
                    </>
            }
        </>
    )
}

export default React.memo(MyCollection)