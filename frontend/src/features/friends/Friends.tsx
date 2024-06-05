import React, { useEffect } from "react"
import {
    useFilterForUsers,
    // useAddFriend,
    useGetAllUsersWithoutThisUser
} from "./frieds_hooks"
import { TextField } from "@mui/material"
import { useAppSelector } from "../../app/store"
import AddFriend from "./AddFriend"


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
        <>
            <h2>Friends</h2>


            <TextField
                sx={{ m: 1 }}
                id='search'
                type="search"
                label='Search game'
                variant="outlined"
                onChange={searchFunc}
            />

            {
                users.map(user => {
                    return (
                        <div>
                        <div key={user.u_id}>
                            <h2>{user.u_firstname} {user.u_lastname}</h2>

                            <h3>{user.u_email}</h3>

                        </div>
                        <AddFriend />
                        </div>
                    )
                })
            }
        </>
    )
}


export default React.memo(Friends)