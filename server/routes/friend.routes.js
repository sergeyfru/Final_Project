
import { _addFriend } from "../controller/friend.controllers.js";
import { verifyToken } from "../middlewares/verifyTaken.js";

import express from 'express'

const router = express.Router();


router.post('/addfriend',verifyToken, _addFriend)



export default router
