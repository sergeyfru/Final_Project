import { Button, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/store"
import { useAllMyFrinds, useConfirmFriendship, useDeleteFriend } from "./frieds_hooks"
import { nanoid } from "@reduxjs/toolkit"
import HomeNav from "./HomeNav"


const FriendsInvitations = () => {
    const [recivedOrSent, setRecivedOrSent] = useState(true)
    const myFriends = useAppSelector(state => state.friendsReducer.myFriends)
    const allMyFrinds = useAllMyFrinds()
    const delFriend = useDeleteFriend()
    const confirmFriendship = useConfirmFriendship()
const user_id_1 = localStorage.getItem('u_id')

    useEffect(() => {
        if (myFriends.length === 0) {
            const u_id = localStorage.getItem('u_id')
            allMyFrinds({ u_id })
        }
    }, [])

const rejectFriend =(user_id_2:string|number)=>{
   delFriend({user_id_2,user_id_1})
} 
const confirmFriend =(user_id_2:string|number)=>{
    confirmFriendship({user_id_2,user_id_1})
} 


    return (
        <>
        <HomeNav />
            <h2>My invitations</h2>
            <Button onClick={() => setRecivedOrSent(true)} variant={ recivedOrSent?"contained":"outlined"}>Sent</Button>
            <Button onClick={() => setRecivedOrSent(false)} variant={ recivedOrSent?"outlined":"contained"}>Recived</Button>
            {
                myFriends.filter(user => user.agreement ===false && user.sent === recivedOrSent).map(user => {
                    return (
                        <Stack direction="row" sx={{ m: 2 }} style={{ justifyContent: "space-between", alignContent: "center", border: "1px solid black", padding: '0 8px', borderRadius:"4px" }} key={nanoid()}>
                            <Stack>
                                <h2>{user.u_firstname} {user.u_lastname}</h2>
                                <h3>{user.u_email}</h3>
                            </Stack>
                            <Stack sx={{ m: 1 ,alignContent:"center", justifyContent:'space-evenly'}}>
                               <Button onClick={()=>confirmFriend(user.u_id)} >Confirm</Button>
                               <Button onClick={()=>rejectFriend(user.u_id)} >Delete</Button>
                            </Stack>
                        </Stack>
                    )
                })
            }
        </>
    )
}

export default FriendsInvitations