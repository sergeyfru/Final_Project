import { useState ,} from "react"
import { nanoid } from "@reduxjs/toolkit"
import axios from "axios"

import {SERVERURL} from '../../environments.ts'
type UserType = {
    u_lastname:string,
    u_firstname:string,
    u_email:string,
    u_id:number|string
}
const Users: React.FC = ()=>{
    const [users,setUsers] = useState<UserType[]>([])

    const getAllUsers = async()=>{
        try {
            const response = await axios(`/api/users`,{
                withCredentials: true,
            })
            // const data = await resp.json()
            console.log(response.data);
            
            setUsers(response.data)
            
        } catch (error) {
            console.log('Error in Users getAll =>',error);

            
        }
    }
    return(
        <>
        <button onClick={getAllUsers}>click</button>
        {
            users.map(user=>{
                return (<div key={nanoid()}> 
<h2>{user.u_firstname} {user.u_lastname}</h2>
<h3>{user.u_email}</h3>
                </div>)
            })
        }
        </>
    )
}
export default Users