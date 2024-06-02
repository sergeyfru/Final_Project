
import Login from "../features/users/Login"
import {  useEffect, useState } from "react"
import { MYURL } from "../../../settings/settings"
import axios from "axios"
import { ProviderProps } from "../types/type"
import {  useAuthContext } from "../App.tsx"


const Auth = ({ children }:ProviderProps) => {
    const { token, refreshToken,  } = useAuthContext()
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        verify()
    }, [])

    const verify = async () => {
        console.log('hi');
        
        console.log(token,refreshToken);
        
        try {
            const response = await axios.get(`${MYURL}/users/verify`, {
                headers: {
                    "x-access-token": token,
                    "x-refresh-token": refreshToken
                },
                withCredentials: true,
            })
            if (response.status === 200) setRedirect(true)

        } catch (error) {
            setRedirect(false)
        }
    }

    return redirect ? children : <>Not Authorised  <Login page={'Login'} /></>
}

export default Auth