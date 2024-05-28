import { _register , _all } from "../controller/users.controllers.js";

import express from 'express'

const router = express.Router();

router.post('/register', _register);
router.get('/', _all)

export default router