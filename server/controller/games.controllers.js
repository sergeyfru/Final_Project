import { myGames, allGames, addToMyList, fetchGames } from "../models/games.models.js";



export const _addToMyList = async (req, res) => {
    const { u_id, gameid } = req.body
    try {
        const addGame = await addToMyList({ u_id, gameid })
        res.json({ msg: 'Game added', addGame })
    } catch (error) {
        console.log('Games controllers   _addToMyList =>', error);
        res.status(404).json({ msg: 'Games not Added. Something went wrong.' })
    }
}

export const _myGames = async (req, res) => {
    console.log('Games controllers => _myGames');
    const { u_id } = req.body
    try {
        const myGameslist = await myGames({ u_id })
        res.json(myGameslist)
    } catch (error) {
        console.log('Games controllers   _allMyGames =>', error);
        res.status(404).json({ msg: 'Games not found. Something went wrong.' })
    }
}

export const _allGames = async (req, res) => {
    console.log('Games controllers => _allGames');

    try {
        const games = await allGames()
        console.log(games);
        res.json(games)


    } catch (error) {
        console.log('Games controllers   _allMyGames =>', error);
        res.status(404).json({ msg: 'Games not found. Something went wrong.' })

    }
}


export const _fetchGames = async (req,res)=>{
    const {game} = req.body
    try {
const plusGame = await fetchGames(game)
        res.json(plusGame)
    } catch (error) {
        console.log(error);
res.status(404).json({msg:'we are not fineshed('})
    }
}