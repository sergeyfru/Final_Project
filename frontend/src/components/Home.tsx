import { useState } from "react"
import { MYURL } from "../../settings.ts"
import axios from "axios"
import { User } from "../types/type.ts"


const Home = () => {
    const [users, setUsers] = useState<User[]>([])

    const allUsers = async () => {
        try {
            const response = await axios.get(MYURL)
            console.log(response.data);
            setUsers(response.data)
        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.error('Axios error', error.message);
            } else {
                console.error('Unexpected error', error);
            }

        }

    }


    return (
        <>
            <button onClick={allUsers}> click</button>
            {
                users.map(user => {
                    return (
                        <div key={user.u_id}>
                            <h2>{user.u_firstname} {user.u_lastname}</h2>
                            <h3>{user.u_email}</h3>

                        </div>
                    )
                })
            }
        </>
    )
}

export default Home