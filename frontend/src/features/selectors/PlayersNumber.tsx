import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector, } from "../../app/store"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, } from "@mui/material"
import { setMinPlayerNumber, setMaxPlayerNumber } from "./selector_slice"
import { filteringGames } from "../games/games_slice"

const PlayersNumber = () => {

    const dispatch = useAppDispatch()
    // const allGames = useAppSelector(state => state.gamesReducer.allGames)
    // const minTime = useAppSelector(state => state.selectorReducer.minTime)
    // const maxTime = useAppSelector(state => state.selectorReducer.maxTime)
    const [minInputValue, setMinInputValue] = useState('')
    const [maxInputValue, setMaxInputValue] = useState('')

    const inputSearch = useAppSelector(state => state.selectorReducer.inputSearch)
    const inputCategory = useAppSelector(state => state.selectorReducer.inputcategory)
    const inputMinTime = useAppSelector(state => state.selectorReducer.inputminTime)
    const inputMaxTime = useAppSelector(state => state.selectorReducer.inputmaxTime)
    const inputMaxPlayerNumber = useAppSelector(state => state.selectorReducer.inputmaxPlayerNumber)
    const inputMinPlayerNumber = useAppSelector(state => state.selectorReducer.inputminPlayerNumber)

    


    useEffect(() => {

    }, [])

    

    const minHandleChange = (event: SelectChangeEvent) => {
        if( maxInputValue !== '' &&parseInt(event.target.value) > parseInt(maxInputValue)){
            alert('The minimum number of players cannot be more than the maximum')
            return
        }
        setMinInputValue(event.target.value)
        dispatch(setMinPlayerNumber(event.target.value))
        dispatch(filteringGames({ inputCategory, inputMaxTime, inputMinTime, inputSearch, inputMaxPlayerNumber, inputMinPlayerNumber:event.target.value }))

        console.log('minInputValue in handelChange', minInputValue);
    };
    const maxHandleChange = (event: SelectChangeEvent) => {
        if( minInputValue !== '' && parseInt(event.target.value) < parseInt(minInputValue)){
            alert('The maximum number of players cannot be more than the minimum')
            return
        }
        setMaxInputValue(event.target.value)
        dispatch(setMaxPlayerNumber(event.target.value))
        dispatch(filteringGames({ inputCategory, inputMaxTime, inputMinTime, inputSearch, inputMaxPlayerNumber:event.target.value, inputMinPlayerNumber }))
        console.log('maxInputValue in handelChange', maxInputValue);
    };


    return (
        <div style={{display:"inline-block"}}>


            <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="demo-simple-select-label">Min Players</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={minInputValue}
                    label="MinPlayers"
                    onChange={minHandleChange}
                >
                    <MenuItem value={''}>Any</MenuItem>
                    <MenuItem value={1}>1 </MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={6}>6</MenuItem>

                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="demo-simple-select-label">Max Players</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={maxInputValue}
                    label="MaxPlayers"
                    onChange={maxHandleChange}
                >
                <MenuItem value={''}>Any</MenuItem>
                    <MenuItem value={1}>1 </MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={99}>{'>8'}</MenuItem>


                </Select>
            </FormControl>

        </div>
    )
}

export default React.memo(PlayersNumber)