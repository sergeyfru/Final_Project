import { _addToMyList,_myGames,_allGames , _fetchGames} from "../controller/games.controllers.js";
import { verifyToken } from "../middlewares/verifyTaken.js";

import express from 'express'
const route = express.Router()

route.post('/addgame', _addToMyList)
route.post('/mygames', _myGames)
route.get('/all', _allGames)

route.post('/stealgames', _fetchGames)










// route.post('/addgame',verifyToken, _addToMyList)
// route.post('/allmygamed',verifyToken, _allMyGames)



export default route