import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } = process.env



// export const refreshToken = (req, res, next) => {
//     console.log(req.cookies);
//     const refreshToken = req.cookies['refreshToken'] || req.headers['x-refresh-token']
//     if (!refreshToken) return res.status(401).json({ msg: 'Refresh token not found' })
//     jwt.verify(refreshToken, ACCESS_TOKEN_SECRET, (err, decode) => {
//         if (err) return res.status(403).json({ msg: 'Refresh token verification failed' })

//         const newAccessToken = jwt.sign(
//             {
//                 u_id: decode.u_id,
//                 u_firstname: decode.u_firstname,
//                 u_lastname: decode.u_lastname,
//                 u_email: decode.u_email,
//             },
//             ACCESS_TOKEN_SECRET,
//             {
//                 expiresIn: ACCESS_TOKEN_EXPIRY,

//             }
//         );
//         req.user = decode
//         res.cookie('u_token', newAccessToken, {
//             httpOnly: true,
//             maxAge: ACCESS_TOKEN_EXPIRY
//         })
//     })

//     const newRefreshToken = jwt.sign(
//         {
//             u_id: req.user.userid,
//             u_firstname: req.user.firstname,
//             u_lastname: req.user.lastname,
//             u_email: req.user.email,
//         },
//         ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: ACCESS_TOKEN_EXPIRY * 60 * 24
//         }
//     )
//     res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: ACCESS_TOKEN_EXPIRY * 60 * 24 })
//     res.json({ msg: 'Token refreshed successfully' })
//     next()
// }




export const verifyToken = (req, res, next) => {
    console.log("COOKIES!!!!!+++++++++++++++++++++++++++++++++++++++++++++++",req.cookies);
    // console.log("HEADERS====================================================",req.headers['x-access-token']);
    
    const accessToken = req.cookies['u_token'] || req.headers['x-access-token']
    const refreshToken = req.cookies['refreshToken'] || req.headers['x-refresh-token']

    if (!accessToken) {
        if (!refreshToken) return res.status(403).json({ msg: 'Token verification failed => Unauthorized' })
        jwt.verify(refreshToken, ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) return res.status(403).json({ msg: 'Refresh token verification failed => Forbidden' })

            const newAccessToken = jwt.sign(
                {
                    u_id: decode.u_id,
                    u_firstname: decode.u_firstname,
                    u_lastname: decode.u_lastname,
                    u_email: decode.u_email,
                },
                ACCESS_TOKEN_SECRET,
                {
                    expiresIn: ACCESS_TOKEN_EXPIRY || 60000,

                }
            );
            req.user = decode
            res.cookie('u_token', newAccessToken, {
                httpOnly: true,
                 maxAge: ACCESS_TOKEN_EXPIRY || 60000
            })
        })

        const newRefreshToken = jwt.sign(
            {
                u_id: req.user.userid,
                u_firstname: req.user.firstname,
                u_lastname: req.user.lastname,
                u_email: req.user.email,
            },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1d'
            }
        )
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: ACCESS_TOKEN_EXPIRY * 60 * 24 ||86400000 })
    }

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) {
            console.log('Access token expired');


        }
        // set user into request
        req.user = decode
        next()
    })

}
