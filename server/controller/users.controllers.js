import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'
import { register, all } from '../models/users.models.js'

dotenv.config();


export const _register = async (req, res) => {
    const { u_firstname, u_lastname, email, password } = req.body;

    try {
        const u_email = email.toLowerCase();
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password + '', salt)

        const newUser = await register({ u_firstname, u_lastname, p_password: hashedPassword, u_email })

        res.json(newUser)

    } catch (error) {
        console.log('Users controllers   _register =>', error);
        res.status(404).json({ msg: 'Register failed'})
    }
}

export const _all = async (req, res) => {
    try {
        const allUsers = await all()

        res.json(allUsers)

    } catch (error) {
        console.log('Users controllers _all =>', error);
        res.status(404).json({ msg: 'Do not get users'})
    }
}