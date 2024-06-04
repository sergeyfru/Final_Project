import { Button } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { filteringGames } from "./games_slice"

const Searching = () => {

    const inputSearch = useAppSelector(state => state.selectorReducer.inputSearch)
    const inputCategory = useAppSelector(state => state.selectorReducer.inputcategory)
    const inputMinTime = useAppSelector(state => state.selectorReducer.inputminTime)
    const inputMaxTime = useAppSelector(state => state.selectorReducer.inputmaxTime)
    const inputMaxPlayerNumber = useAppSelector(state => state.selectorReducer.inputmaxPlayerNumber)
    const inputMinPlayerNumber = useAppSelector(state => state.selectorReducer.inputminPlayerNumber)
    const dispatch = useAppDispatch()

    const filteringGame = () => {
        dispatch(filteringGames({ inputCategory, inputMaxTime, inputMinTime, inputSearch, inputMaxPlayerNumber, inputMinPlayerNumber }))
    }

    return (

        <Button variant="contained" onClick={filteringGame} sx={{ m: 1 }} >Search</Button>
    )
}

export default Searching