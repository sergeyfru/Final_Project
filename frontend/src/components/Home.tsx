import React from "react"
import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../app/store.ts"
import { getAllUsers } from "../features/friends/friends_slice.ts"

const Home = () => {
    const users = useAppSelector(state => state.friendsReducer.filteredUsers)
    const firstname = localStorage.getItem('firstname')
    const lastname = localStorage.getItem('lastname')
    const u_id = localStorage.getItem('u_id')
    const [disp, setDisp] = useState('none')
    const dispatch = useAppDispatch()
    

    const allUsers = async () => {
        if (disp === 'none') {

            setDisp('block')
        } else {

            setDisp('none')
        }

        dispatch(getAllUsers({u_id} ))

    }


    return (
        <>
            <h2>Welcome, {firstname} {lastname} {u_id}</h2>
            <button onClick={allUsers}> click</button>
            <div style={{ display: disp }}>
                <h1>{firstname}, stop clicking!!!</h1>
            </div>
            {
                users.map(user => {
                    return (
                        <div key={user.u_id}>
                            <h2>ID:{user.u_id} ,{user.u_firstname} {user.u_lastname}</h2>
                           
                            <h3>{user.u_email}</h3>

                        </div>
                    )
                })
            }
        </>
    )
}

export default React.memo(Home)
// export default Home