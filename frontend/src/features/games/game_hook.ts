import { useCallback } from "react"
import { useAppDispatch } from "../../app/store"
import { getAllGames } from "./games_slice"


export const useGetAllGames = () => {
    const dispatch = useAppDispatch()
    return useCallback(() => {

        dispatch(getAllGames())

    }, [dispatch])
}