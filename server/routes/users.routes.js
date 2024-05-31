import { _register , _all, _login } from "../controller/users.controllers.js";
import { verifyToken } from "../middlewares/verifyTaken.js";

import express from 'express'

const router = express.Router();

router.post('/register', _register);
router.post('/login', _login);
router.get('/', _all)
// router.get('/',verifyToken, _all)

export default router