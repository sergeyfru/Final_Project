import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'
import { register, all, login } from '../models/users.models.js'

dotenv.config();

const { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET } = process.env


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
        const { email, password } = req.body
        const { user, hashpassword } = await login(email.toLowerCase())

        if (!user) return res.status(404).json({ msg: 'Email not found' })

        const isMatch = bcrypt.compareSync(password + '', hashpassword.p_password)
        if (!isMatch) return res.status(404).json({ msg: 'Wrong password' })

        const accessToken = jwt.sign(
            {
                u_id: user.u_id,
                u_firstname: user.u_firstname,
                u_lastname:user.u_lastname,
                u_email: user.u_email,
            },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_EXPIRY // '1m'
            }
        );
        
        res.cookie('u_token', accessToken, {
            httpOnly: true,
            // maxAge: ACCESS_TOKEN_EXPIRY
        })

        const refreshToken = jwt.sign(
            {
                u_id: user.u_id,
                u_firstname: user.u_firstname,
                u_lastname:user.u_lastname,
                u_email: user.u_email,  
            },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1d'
            }
        )
        
        res.cookie('refreshToken',refreshToken,{
            httpOnly:true,
            maxAge: ACCESS_TOKEN_EXPIRY*60*24
        })
        
        res.json({ token: accessToken, user })

    } catch (error) {
        console.log('Users controllers _login =>', error);
        res.status(404).json({ msg: 'Login failed' })
    }
}