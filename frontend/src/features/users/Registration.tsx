import { useRegister } from "./user_hooks"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginRegistrationProps } from "../../types/type"
import { Box, Button, TextField, } from "@mui/material";
import { User } from "../../types/type";
import { useDispatch } from "react-redux";
import { register } from "./user_slice";
import { useAppDispatch } from "../../app/store";

const Registration = ({ page }: LoginRegistrationProps) => {
    const navigate = useNavigate()
    const [u_email, setEmail] = useState('')
    const [u_firstname, setFirstname] = useState('')
    const [u_lastname, setLastname] = useState('')
    const [p_password, setPassword] = useState('')
const dispatch = useAppDispatch()
    // const newUser = useRegister()

    const registerUser = async () => {

        try {

           const res = await dispatch(register({ u_firstname, u_lastname, u_email, p_password }))
console.log("register  res =>", res);

            // navigate('/login')
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
        </>
    )

}

export default Registration