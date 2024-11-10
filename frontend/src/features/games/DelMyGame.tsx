import { DelMyGameProps } from "../../types/type";
import { Button } from "@mui/material";
import { useDelMyGame } from "./game_hook";

const DelMyGame = ({ gameid }: DelMyGameProps) => {
    const u_id = localStorage.getItem("u_id");
    const delMyGameHook = useDelMyGame();

    const delGame = async () => {
        delMyGameHook({ gameid, u_id });
    };

    return (
        <>
            <Button variant="outlined" onClick={delGame}>
                Delete
            </Button>
        </>
    );
};

export default DelMyGame;
