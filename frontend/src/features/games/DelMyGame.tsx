
import { DelMyGameProps } from "../../types/type"
import { Button } from "@mui/material"
import { useDelMyGame } from "./game_hook"

const DelMyGame = ({ gameid, }: DelMyGameProps) => {
    const u_id = localStorage.getItem("u_id")
    const delMyGameHook = useDelMyGame()

    const delGame = async () => {
        delMyGameHook({gameid,u_id})

        // try {
        //     const afterDel = await axios.post(`${import.meta.env.VITE_API_URL}/games/delmy`,
        //         { u_id, gameid },
        //         { withCredentials: true }
        //     )
        //     if (afterDel.status === 200) {

        //         alert(afterDel.data.msg)
        //     }


        // } catch (error) {
        //     if (axios.isAxiosError(error)) {
        //         console.error('Axios error', error.message);
        //         console.log('Axios error', error);
        //         return error

        //     } else {
        //         console.error('Unexpected error', error);
        //     }
        // }

    }


    return (
        <>
            <Button onClick={delGame}>Delete</Button>
        </>
    )
}

export default DelMyGame