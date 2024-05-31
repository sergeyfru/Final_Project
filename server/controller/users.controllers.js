import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'
import { register, all, login } from '../models/users.models.js'

dotenv.config();

const { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET } = process.env


export const _register = async (req, res) => {
    const { u_firstname, u_lastname, u_email, p_password } = req.body;

    try {
        const emailToLower = u_email.toLowerCase();
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(p_password + '', salt)

        const newUser = await register({ u_firstname, u_lastname, p_password: hashedPassword, u_email: emailToLower })

        res.json(newUser)

    } catch (error) {
        console.log('Users controllers   _register =>', error);
        res.status(404).json({ msg: 'Register failed' })
    }
}

export const _all = async (req, res) => {
    try {
        const allUsers = await all()

        res.json(allUsers)

    } catch (error) {
        console.log('Users controllers _all =>', error);
        res.status(404).json({ msg: 'Do not get users' })
    }
}

export const _login = async (req, res) => {

    try {
        const { u_email, p_password } = req.body
        const { user, hashpassword } = await login(u_email.toLowerCase())

        if (!user) {
            
            console.log('in users controlles => email not found');
            return res.status(404).json({ msg: 'Email not found' })
        }

        const isMatch = bcrypt.compareSync(p_password + '', hashpassword.p_password)
        if (!isMatch) return res.status(404).json({ msg: 'Wrong password' })
        console.log('user in u.con', user);
        const accessToken = jwt.sign(
            {
                u_id: user.u_id,
                u_firstname: user.u_firstname,
                u_lastname: user.u_lastname,
                u_email: user.u_email,
            },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_EXPIRY || '1m'
            }
        );

        res.cookie('u_token', accessToken, {
            httpOnly: true,
            maxAge: ACCESS_TOKEN_EXPIRY || '1m'
        })

        const refreshToken = jwt.sign(
            {
                u_id: user.u_id,
                u_firstname: user.u_firstname,
                u_lastname: user.u_lastname,
                u_email: user.u_email,
            },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_EXPIRY * 60 * 24 || 86400000
            }
        )

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: ACCESS_TOKEN_EXPIRY * 60 * 24 || 86400000
        })

        res.json({ u_token: accessToken, user, refreshToken })

    } catch (error) {
        console.log('Users controllers _login =>', error);
        res.status(404).json({ msg: 'Login failed' })
    }
}