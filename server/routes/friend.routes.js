
import { _addFriend, _allMyFriends, _confirmFriendship, _rejectFriend } from "../controller/friend.controllers.js";
import { verifyToken } from "../middlewares/verifyTaken.js";

import express from 'express'

const router = express.Router();


// router.post('/addfriend',verifyToken, _addFriend)
router.post('/addfriend', _addFriend)
router.post('/allmyfriends', _allMyFriends)
router.delete('/delfriend', _rejectFriend)
router.put('/confirmfriend', _confirmFriendship)



export default router
