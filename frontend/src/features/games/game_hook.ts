import { useCallback } from "react"
import { useAppDispatch } from "../../app/store"
import { delMyGame, getAllGames ,joinCollection,myGames,} from "./games_slice"
import {  DelMyGameType, JoinCollection, MyGames,  } from "../../types/type"


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


export const useDelMyGame = ()=>{
    const dispatch = useAppDispatch()
    return useCallback(({ gameid, u_id }:DelMyGameType)=>{
        dispatch(delMyGame({ gameid, u_id }))
    },[dispatch])
}
export const useJoinCollection = ()=>{
    const dispatch = useAppDispatch()
    return useCallback(({ u_id, user_id_1, user_id_2, user_id_3, user_id_4, user_id_5 }: JoinCollection)=>{
        dispatch(joinCollection({ u_id, user_id_1, user_id_2, user_id_3, user_id_4, user_id_5 }))
    },[dispatch])
}