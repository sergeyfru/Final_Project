// import { useLogin } from "./user_hooks"
import { useState } from "react";
import { LoginRegistrationProps } from "../../types/type"
import { Box, Button,  FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "./user_slice";
import { useAppDispatch } from "../../app/store";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = ({ page }: LoginRegistrationProps) => {
    const [message, setMessage] = useState('')
    const [u_email, setEmail] = useState('')
    const [p_password, setPassword] = useState('')
    const dispatch = useAppDispatch()
    // const checkUser = useLogin()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };



    const handleApiResponse = (res: any) => {
        // Assuming the response has the structure: res.payload?.response.data.msg
        console.log(res);

        if (res.payload?.u_token) {
            console.log('Login => status 200');
            navigate('/home')
        } else {
            setMessage(res.payload?.response.data.msg)
            console.log('Login => status not 200');
        }
    };



    const loginUser = async () => {

        try {
            console.log('try to get token from localStorage', localStorage.getItem('u_token'));

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
                <FormControl sx={{ m: 1, }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                {/* <TextField
                    sx={{ m: 1 }}
                    id='password'
                    type="password"
                    label='Enter your password'
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                /> */}
                <Button variant="contained" sx={{ m: 1 }} onClick={loginUser}>{page}</Button>

            </Box>
            <div>{message}</div>
        </>
    )

}

export default Login