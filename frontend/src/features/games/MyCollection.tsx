import React, { useEffect, useState } from "react"
import { BoardGame } from "../../types/type"
import axios from "axios"

import DelMyGame from "./DelMyGame.tsx"
import RandomGame from "./RandomGame.tsx"
import { MYURL } from "../../../../settings/settings.ts"


const MyCollection = () => {
    const [collection, setCollection] = useState<BoardGame[]>([])

    const myGames = async () => {
        try {
            const u_id = localStorage.getItem("u_id")

            const resp = await axios.post(`${MYURL}/games/mygames`,
                { u_id },
                { withCredentials: true }
            )

            setCollection(resp.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        myGames()
    }, [])

    return (
        <>
            <h2>My Collection: {collection.length}</h2>
            <RandomGame collection={collection} setCollection={setCollection} />
            {
                collection.map(game => {
                    return (
                        <div key={game.gameid}>
                            <h2>{game.name}</h2>
                            <h3>{game.description}</h3>
                            <img src={game.thumbnail} alt="" />
                            <DelMyGame gameid={game.gameid} setCollection={setCollection} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default React.memo(MyCollection)