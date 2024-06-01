import React, { useEffect } from "react"
import { useState } from "react"
// import { MYURL } from "../../../settings.ts"
// import axios from "axios"
// import { User, } from "../types/type.ts"



const Home = () => {
    // const [users, setUsers] = useState<User[]>([])
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [disp, setDisp] = useState('none')

    useEffect(() => {
        console.log('UseEffect Home');

        setFirstName(localStorage.firstname)
        setLastName(localStorage.lastname)
    }, [])

    const allUsers = async () => {
        console.log('hi');
        
        if (disp === 'none') {

            setDisp('block')
        }else{
            
            setDisp('none')
        }


        // try {
        //     const response = await axios.get(`${MYURL}/users`,
        //         {
        //             headers: {
        //                 'x-access-token': localStorage.u_token,
        //                 'x-refresh-token': localStorage.refresh,
        //             },
        //             withCredentials: true
        //         }
        //     )
        //     console.log(response.data);
        //     setUsers(response.data)
        // } catch (error) {

        //     if (axios.isAxiosError(error)) {
        //         console.error('Axios error', error.message);
        //     } else {
        //         console.error('Unexpected error', error);
        //     }

        // }

    }


    return (
        <>
            <h2>Welcome, {firstname} {lastname}</h2>
            <button onClick={allUsers}> click</button>
            <div style={{ display: disp }}>
                <h1>{firstname}, stop clicking!!!</h1>
            </div>
            {/* {
                users.map(user => {
                    return (
                        <div key={user.u_id}>
                            <h2>{user.u_firstname} {user.u_lastname}</h2>
                            <h3>{user.u_email}</h3>

                        </div>
                    )
                })
            } */}
        </>
    )
}

export default React.memo(Home)