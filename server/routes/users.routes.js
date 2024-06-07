import { _register, _all, _login, } from "../controller/users.controllers.js";
import { verifyToken } from "../middlewares/verifyTaken.js";

import express from 'express'

const router = express.Router();

router.post('/register', _register);
router.post('/login', _login);
// router.get('/', _all)

router.get('/', verifyToken, _all)

router.get('/verify', verifyToken, (req, res) => {


    res.sendStatus(200)
})


router.get('/logout', (req, res) => {
    try {
        console.log(req.cookies);
        res.clearCookie("u_token",{path:"/"});
        res.clearCookie("refreshToken",{path:'/'});
        req.cookies['u_token']  = null
        res.json({ msg: 'Logged out successfully' })
    } catch (error) {
        console.error('Error:', error);
    }
})

export default router