import { Button, Stack } from "@mui/material"
import { Link } from "react-router-dom"


const HomeNav =()=>{
    const firstname = localStorage.getItem('firstname')
    const lastname = localStorage.getItem('lastname')

    return(
        <>
         <h2>Welcome, {firstname} {lastname}</h2>
        <Stack spacing={2} direction={'row'}>
            <Button component={Link} to='/home/myfriends'>
                My friends
            </Button>
            <Button component={Link} to='/home/myfriends/myinvitation'>
            My invitations
            </Button>
            <Button component={Link} to='/home/searchfriend'>
                Find friend
            </Button>
            <Button component={Link} to='/home/settings'>
                Settings
            </Button>
        </Stack>
        </>
    )
}

export default HomeNav