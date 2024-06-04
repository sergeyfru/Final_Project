import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,  } from "@mui/material"
import { getCategories, setCategory } from "./selector_slice"
import { filteringGames } from "../games/games_slice"

const Category = () => {
    const allGames = useAppSelector(state => state.gamesReducer.allGames)
    const category = useAppSelector(state => state.selectorReducer.category)
    const [inputValue, setInputValue] = useState('')
    const inputSearch = useAppSelector(state => state.selectorReducer.inputSearch)
    const inputMinTime = useAppSelector(state => state.selectorReducer.inputminTime)
    const inputMaxTime = useAppSelector(state => state.selectorReducer.inputmaxTime)
    const inputMaxPlayerNumber = useAppSelector(state => state.selectorReducer.inputmaxPlayerNumber)
    const inputMinPlayerNumber = useAppSelector(state => state.selectorReducer.inputminPlayerNumber)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (category.length === 0) {
            getCategory()
        }
    }, [])

    const getCategory = () => {
        dispatch(getCategories(allGames))

    }

    const handleChange = async (event: SelectChangeEvent) => {

        setInputValue(event.target.value)

        dispatch(setCategory(event.target.value))
        dispatch(filteringGames({ inputCategory:event.target.value , inputMaxTime, inputMinTime, inputSearch, inputMaxPlayerNumber, inputMinPlayerNumber}))

    };


    return (
        <>


            <FormControl sx={{ m: 1, width: 120 }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputValue}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value={``} >Any</MenuItem>
                    {
                        category.map((item, i) => {
                            return <MenuItem value={`${item}`} key={i}>{item}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>

        </>
    )
}

export default Category