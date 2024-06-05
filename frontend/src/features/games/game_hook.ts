import { useCallback } from "react"
import { useAppDispatch } from "../../app/store"
import { delMyGame, getAllGames ,myGames, randomGame} from "./games_slice"
import {  DelMyGameType, MyGames, RandomGame } from "../../types/type"


export const useGetAllGames = () => {
    const dispatch = useAppDispatch()
    return useCallback(() => {

        dispatch(getAllGames())

    }, [dispatch])
}
export const useGetMyGames = () => {
    const dispatch = useAppDispatch()
    return useCallback(({u_id}:MyGames) => {

        dispatch(myGames({u_id}))

    }, [dispatch])
}

export const useRandomGame = ()=>{
    const dispatch = useAppDispatch()
    return useCallback(({randindex}:RandomGame)=>{
        dispatch(randomGame({randindex}))
    },[dispatch])
}
export const useDelMyGame = ()=>{
    const dispatch = useAppDispatch()
    return useCallback(({ gameid, u_id }:DelMyGameType)=>{
        dispatch(delMyGame({ gameid, u_id }))
    },[dispatch])
}