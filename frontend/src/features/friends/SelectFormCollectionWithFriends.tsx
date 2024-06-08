import { useAppSelector } from "../../app/store"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, } from "@mui/material";


export type SelectFormCollectionWithFriends = {
    check_1: string,
    check_2: string,
    check_3: string
    check_4: string,
    setState: (user_id: string) => void,
    next:string,
    previous:string,
    present:string,



}

const SelectFormCollectionWithFriends = ({check_1, check_2, check_3, check_4, setState,next,previous,present}:SelectFormCollectionWithFriends) => {
const myFriends = useAppSelector(state =>state.friendsReducer.myFriends.filter(user => user.agreement===true))
const handleChange = (e: SelectChangeEvent) => {
    if (next.length > 0 && e.target.value === '') {
        alert('You have to select someone here')
    } else if(e.target.value ===  check_1 ||e.target.value ===  check_2||e.target.value ===  check_3||e.target.value ===  check_4){

        alert('You already chose this friend')
    } else{
        // setUser_id_1(e.target.value)
        setState(e.target.value)
    }

}

    return (
        <FormControl disabled={previous.length <= 0} sx={{ m: 1, minWidth: 145 }}>
                <InputLabel id="demo-simple-select-required-label">Select Friend</InputLabel>
                <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={`${present}`}
                    label="Second friend "
                    autoWidth
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        myFriends.map(user => {
                            return (
                                <MenuItem value={`${user.u_id}`}>{user.u_firstname} {user.u_lastname}</MenuItem>
                            )
                        })
                    }


                </Select>
            </FormControl>
    )
}

export default SelectFormCollectionWithFriends