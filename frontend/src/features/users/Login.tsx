// import { useLogin } from "./user_hooks"
import { useState } from "react";
import { LoginRegistrationProps } from "../../types/type"
import { Box, Button, TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "./user_slice";
import { useAppDispatch } from "../../app/store";
import { Axios } from "axios";

const Login = ({ page }: LoginRegistrationProps) => {
    const [message, setMessage] = useState('')
    const [u_email, setEmail] = useState('')
    const [p_password, setPassword] = useState('')
    const dispatch = useAppDispatch()
    // const checkUser = useLogin()
    const navigate = useNavigate()


    const handleApiResponse = (res:any) => {
        // Assuming the response has the structure: res.payload?.response.data.msg
      
        if (res.payload?.request?.status === 200) {
            console.log('Login => status 200');
            navigate('/allgames')

        } else {
            setMessage(res.payload?.response.data.msg)
            console.log('Login => status not 200');
        }
      };



    const loginUser = async () => {

        try {

            const res = await dispatch(login({ u_email, p_password }))

            console.log('res = >', res);
handleApiResponse(res)
            // if (res.payload?.request?.status === 200) {
            //     console.log('Login => status 200');
            //     navigate('/allgames')

            // } else {
            //     setMessage(res.payload?.response.data.msg)
            //     console.log('Login => status not 200');
            // }

        } catch (error) {
            console.log('Login', error);



        }

    }
    return (
        <>
            <Box component={'form'} justifyContent={"center"} display={"flex"} flexDirection={'column'} alignContent={"center"} sx={{ m: 1 }} noValidate autoComplete="off">
                <TextField
                    sx={{ m: 1 }}
                    id='email'
                    type="email"
                    label='Enter your email'
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    sx={{ m: 1 }}
                    id='password'
                    type="password"
                    label='Enter your password'
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" sx={{ m: 1 }} onClick={loginUser}>{page}</Button>

            </Box>
            <div>{message}</div>
        </>
    )

}

export default Login