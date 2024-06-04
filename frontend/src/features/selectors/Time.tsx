import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector,} from "../../app/store"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, } from "@mui/material"
import { setMinTime, setMaxTime } from "./selector_slice"
import { filteringGames } from "../games/games_slice"
const Time = () => {
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
        if( maxInputValue !== '' && parseInt(event.target.value) > parseInt(maxInputValue)){
            alert(`The minimum playing time cannot be more than the maximum, ${event.target.value},${ maxInputValue}`)
            return
        }
        setMinInputValue(event.target.value)
        dispatch(setMinTime(event.target.value))
        dispatch(filteringGames({ inputCategory , inputMaxTime, inputMinTime:event.target.value, inputSearch, inputMaxPlayerNumber, inputMinPlayerNumber}))

        console.log('minInputValue in handelChange', minInputValue);
    };
    const maxHandleChange = (event: SelectChangeEvent) => {
        if(  minInputValue !== '' && parseInt(event.target.value) < parseInt(minInputValue)){
            alert(`The minimum playing time cannot be less than the maximum, ${event.target.value},${ minInputValue} ${event.target.value>minInputValue}`)
            return
        }
        setMaxInputValue(event.target.value)
        dispatch(setMaxTime(event.target.value))
        dispatch(filteringGames({ inputCategory , inputMaxTime:event.target.value, inputMinTime, inputSearch, inputMaxPlayerNumber, inputMinPlayerNumber}))

        console.log('maxInputValue in handelChange', maxInputValue);
    };


    return (
        <>


            <FormControl sx={{ m: 1, width: 120 }}>
                <InputLabel id="demo-simple-select-label">Min Time</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={minInputValue}
                    label="MinTime"
                    onChange={minHandleChange}
                >
                    <MenuItem value={''}>Any</MenuItem>
                    <MenuItem value={'10'}>10 min</MenuItem>
                    <MenuItem value={'30'}>30 min</MenuItem>
                    <MenuItem value={'45'}>45 min</MenuItem>
                    <MenuItem value={'60'}>1 hour</MenuItem>
                    <MenuItem value={'90'}>1.5 hour</MenuItem>
                    <MenuItem value={'120'}>2 hours</MenuItem>

                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 120 }}>
                <InputLabel id="demo-simple-select-label">Max Time</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={maxInputValue}
                    label="MaxTime"
                    onChange={maxHandleChange}
                >

                    <MenuItem value={''}>Any</MenuItem>
                    <MenuItem value={'20'}>20 min</MenuItem>
                    <MenuItem value={'40'}>40 min</MenuItem>
                    <MenuItem value={'60'}>1 hour</MenuItem>
                    <MenuItem value={'90'}>1.5 hour</MenuItem>
                    <MenuItem value={'120'}>2 hours</MenuItem>
                    <MenuItem value={'121'}>{">2 hours"}</MenuItem>


                </Select>
            </FormControl>

        </>
    )
}

export default React.memo(Time)