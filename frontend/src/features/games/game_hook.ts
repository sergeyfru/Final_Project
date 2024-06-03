import { useCallback } from "react"
import { useAppDispatch } from "../../app/store"
import { getAllGames } from "./games_slice"
import { SearchingProps } from "../../types/type"


export const useGetAllGames = () => {
    const dispatch = useAppDispatch()
    return useCallback(({filter, setFilter}:SearchingProps) => {

        dispatch(getAllGames({filter, setFilter}))

    }, [dispatch])
}