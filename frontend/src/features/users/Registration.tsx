
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginRegistrationProps } from "../../types/type"
import { Box, Button, TextField, } from "@mui/material";

import { register } from "./user_slice";
import { useAppDispatch } from "../../app/store";
// import { useRegister } from "./user_hooks";

const Registration = ({ page }: LoginRegistrationProps) => {
    const navigate = useNavigate()
    const [u_email, setEmail] = useState('')
    const [u_firstname, setFirstname] = useState('')
    const [u_lastname, setLastname] = useState('')
    const [p_password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useAppDispatch()
    // const dispatch = useRegister()


    const handleApiResponse = (res: any) => {
        // Assuming the response has the structure: res.payload?.response.data.msg

        if (res.payload?.request?.status === 200) {
            console.log('Login => status 200');
            navigate('/login')

        } else {
            setMessage(res.payload?.response.data.msg)
            console.log('Login => status not 200');
        }
    };

    const registerUser = async () => {

        try {

            const response = await dispatch(register({ u_firstname, u_lastname, u_email, p_password }))
            console.log("register  res  IN REGISTRATION=>", response);
            handleApiResponse(response)

        } catch (error) {
            console.log(error);



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
                    id='u_firstname'
                    type="text"
                    label='Enter your name'
                    variant="outlined"
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <TextField
                    sx={{ m: 1 }}
                    id='u_lastname'
                    type="text"
                    label='Enter your last name'
                    variant="outlined"
                    onChange={(e) => setLastname(e.target.value)}
                />
                <TextField
                    sx={{ m: 1 }}
                    id='password'
                    type="password"
                    label='Create a password'
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" sx={{ m: 1 }} onClick={registerUser}>{page}</Button>

            </Box>
            <div>{message}</div>
        </>
    )

}

export default Registration