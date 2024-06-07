import { Button } from "@mui/material"
import { AddFriendProps,  } from "../../types/type"
import { useAddFriend } from "./frieds_hooks"

const AddFriend =  ({user_id_2}:AddFriendProps)=>{
    const addNewFriend = useAddFriend()
    const user_id_1 = localStorage.getItem('u_id')

    const addFriendFunc=()=>{
        // const user_id_2 = user2.u_id
addNewFriend({user_id_1,user_id_2})

    }

    return (
        <>
        <Button  variant="contained" sx={{ m: 1 }} onClick={addFriendFunc}>Add Friend</Button>
        </>
    )
}


export default AddFriend