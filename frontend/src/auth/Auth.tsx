
import Login from "../features/users/Login"
import { useEffect, useState } from "react"
import axios from "axios"
import { ProviderProps } from "../types/type"
import { useAppSelector } from "../app/store.ts"


const Auth = ({ children }: ProviderProps) => {
    const refreshToken = useAppSelector(state=> state.userReducer.refreshToken)
    const token = useAppSelector(state=> state.userReducer.u_token)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        verify()
    }, [])

    const verify = async () => {

        console.log('AUTH','token',token, 'refreshToken', refreshToken);

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/verify`, {
                headers: {
                    "x-access-token": token,
                    "x-refresh-token": refreshToken
                },
                withCredentials: true,
            })
            if (response.status === 200) {
                setRedirect(true)
            } else {
                console.log(response);
                
            }


        } catch (error) {
            setRedirect(false)
        }
    }

    return redirect ? children : <>Not Authorised  <Login page={'Login'} /></>
}

export default Auth