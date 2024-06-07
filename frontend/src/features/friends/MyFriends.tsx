import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAppSelector } from "../../app/store"
import { EnumLoadingStatus, FriendUser } from "../../types/type"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { Button, Stack } from "@mui/material"
import { useEffect } from "react"
import { useAllMyFrinds, useDeleteFriend } from "./frieds_hooks"
import { nanoid } from "@reduxjs/toolkit"
import HomeNav from "./HomeNav"
import { CheckBox } from "@mui/icons-material"


const MyFriends = () => {
    const allMyFrinds = useAllMyFrinds()
    const delFriend = useDeleteFriend()
    const user_id_1 = localStorage.getItem('u_id')
    // const u_id = localStorage.getItem('u_id')
    const myFriends: FriendUser[] = useAppSelector(state => state.friendsReducer.myFriends)

    const status = useAppSelector(state => state.friendsReducer.status)
    console.log('myfriends', myFriends);

    useEffect(() => {
        const u_id = localStorage.getItem('u_id')
        console.log('u_id', u_id);

        allMyFrinds({ u_id })
    }, [])

    
const rejectFriend =(user_id_2:string|number)=>{
   delFriend({user_id_2,user_id_1})
} 
    return (
        <>
            <HomeNav />
            <h2>My Friends: {myFriends.filter(user => user.agreement === true).length}</h2>
            {
                status === EnumLoadingStatus.Loading ? <FontAwesomeIcon icon={faSpinner} spinPulse style={{ fontSize: "64px" }} /> :
                    status === EnumLoadingStatus.Failed ? <h1>Fail in loading</h1> :
                        <>
                            {
                                myFriends.filter(user => user.agreement === true).map(user => {
                                    return (
                                        <Stack direction="row" sx={{ m: 2 }} style={{ justifyContent: "space-between", alignContent: "center", border: "1px solid black", padding: '0 8px', borderRadius:"4px" }} key={nanoid()}>
                                         
                                        <Stack>
                                            <h2>{user.u_firstname} {user.u_lastname}</h2>
                                            <h3>{user.u_email}</h3>
                                        </Stack>
                                        <Stack sx={{ m: 1 ,alignContent:"center", justifyContent:'space-evenly'}}>
                                           <Button onClick={()=>rejectFriend(user.u_id)} >Delete</Button>
                                        </Stack>
                                    </Stack>
                                    )
                                })
                            }
                        </>

            }
        </>
    )
}

export default MyFriends