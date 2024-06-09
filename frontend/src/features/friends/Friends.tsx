import React, { useEffect } from "react"
import {
    useFilterForUsers,
    // useAddFriend,
    useGetAllUsersWithoutThisUser
} from "./frieds_hooks"
import {  Stack, TextField } from "@mui/material"
import { useAppSelector } from "../../app/store"
import AddFriend from "./AddFriend"
import { nanoid } from "@reduxjs/toolkit"
import HomeNav from "./FriendsNav"


const Friends = () => {
    const getAllUsers = useGetAllUsersWithoutThisUser()
    const users = useAppSelector(state => state.friendsReducer.filteredUsers)
    const u_id = localStorage.getItem('u_id')
    const searchUser = useFilterForUsers()


    const searchFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchUser(e.target.value)
    }
    useEffect(() => {
        getAllUsers({ u_id })
    }, [])

    return (
        <div key={464}>
            <HomeNav />
            <h2>Friends</h2>


            <TextField
                sx={{ m: 1 }}
                id='search'
                type="search"
                label='Search user'
                variant="outlined"
                onChange={searchFunc}
            />

            {
                users.map((user,) => {
                    return (
                        <Stack direction="row" sx={{ m: 2 }} style={{ justifyContent: "space-between", alignContent: "center", border: "1px solid black", padding: '0 8px', borderRadius:"4px" }} key={nanoid()}>
                            <Stack>
                                <h2>{user.u_firstname} {user.u_lastname}</h2>
                                <h3>{user.u_email}</h3>
                            </Stack>
                            <Stack sx={{ m: 1, alignContent: "center", justifyContent: 'space-evenly' }}>
                                <AddFriend user_id_2={user.u_id} />

                            </Stack>
                        </Stack>
                    )
                })
            }
        </div>
    )
}


export default React.memo(Friends)