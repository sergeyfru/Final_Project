import { _addToMyList, _myGames, _allGames, _fetchGames, _delMyGame ,_updateFetchGames, _myFriendsCollection} from "../controller/games.controllers.js";
import { verifyToken } from "../middlewares/verifyTaken.js";

import express from 'express'
const route = express.Router()

route.post('/addgame',  _addToMyList)
route.post('/mygames',  _myGames)
route.get('/all',  _allGames)
route.post('/delmy',  _delMyGame)
route.post('/friendscollection',  _myFriendsCollection)

route.post('/savinggames', _fetchGames)
route.put('/savinggames', _updateFetchGames)










// route.post('/addgame',verifyToken, _addToMyList)
// route.post('/allmygamed',verifyToken, _allMyGames)



export default route