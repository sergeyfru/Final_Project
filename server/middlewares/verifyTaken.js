import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } = process.env;

export const verifyToken = (req, res, next) => {
    const accessToken = req.cookies["u_token"] || req.headers["x-access-token"];
    const refreshToken =
        req.cookies["refreshToken"] || req.headers["x-refresh-token"];
    // console.log("Im in verify",accessToken,refreshToken);
    if (!accessToken && ACCESS_TOKEN_SECRET) {
        if (!refreshToken) {
            return res
                .status(403)
                .json({ msg: "Token verification failed => Unauthorized" });
        }

        jwt.verify(refreshToken, ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) {
                return res
                    .status(403)
                    .json({
                        msg: `Access token verification failed => ${err.message}`,
                    });
            }

            const newAccessToken = jwt.sign(
                {
                    u_id: decode.u_id,
                    u_firstname: decode.u_firstname,
                    u_lastname: decode.u_lastname,
                    u_email: decode.u_email,
                },
                ACCESS_TOKEN_SECRET,
                {
                    expiresIn: ACCESS_TOKEN_EXPIRY,
                }
            );
            req.user = decode;
            res.cookie("u_token", newAccessToken, {
                httpOnly: true,
                maxAge: ACCESS_TOKEN_EXPIRY,
            });
        });

        const newRefreshToken = jwt.sign(
            {
                u_id: req.user.userid,
                u_firstname: req.user.firstname,
                u_lastname: req.user.lastname,
                u_email: req.user.email,
            },
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: ACCESS_TOKEN_EXPIRY * 24,
            }
        );

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            maxAge: ACCESS_TOKEN_EXPIRY * 24,
        });
        next();
    } else {
        jwt.verify(accessToken, `${ACCESS_TOKEN_SECRET}`, (err, decode) => {
            if (err) {
                return res
                    .status(403)
                    .json({
                        msg: `Access token verification failed => ${err.message}`,
                    });
            }
            console.log("verify is fineshed. all is good");
            req.user = decode;
            next();
        });
    }
};
