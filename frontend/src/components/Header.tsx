
import { Link, useNavigate, } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector, } from "../app/store";
import { logOut } from "../features/users/user_slice";
import { EnumLoginStatus } from "../types/type";

const Header = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const isLogedIn = useAppSelector(state => state.userReducer.isisLogedIn)
    const logoutfunc = async () => {
        localStorage.clear()
        const response = await dispatch(logOut())
        console.log(response);
        handleApiResponse(response)

    }
    const handleApiResponse = (res: any) => {
        // Assuming the response has the structure: res.payload?.response.data.msg
        console.log(res);

        if (res.payload?.u_token) {
            console.log('logOut => status 200');
            navigate('/login')
        } else {
            console.log('logOut => status not 200');
        }
    };
    return (
        <Stack spacing={2} direction={'row'}>
            <Button component={Link} to='/home'>
                Home
            </Button>
            <Button component={Link} to='/allgames'>
                All games
            </Button>
            <Button component={Link} to='/mygames'>
                My games
            </Button>
            {
                isLogedIn === EnumLoginStatus.Logout ?
                    <>
                        <Button component={Link} to='/login'>
                            Log in
                        </Button>
                        <Button component={Link} to='/register'>
                            Register
                        </Button>
                    </> :
                    <Button onClick={logoutfunc} >Log out</Button>

            }

        </Stack>
    );
};

export default Header;
