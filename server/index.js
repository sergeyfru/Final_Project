import path, { dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import users_routes from "./routes/users.routes.js";
import games_routes from "./routes/games.routes.js";
import friends_routes from "./routes/friend.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const customFormat = (tokens, req, res) => {
    const url = chalk.yellow(tokens.url(req, res));
    const method = chalk.green(tokens.method(req, res));
    const status = chalk.hex("#8a2be2")(tokens.status(req, res));
    return `Request: ${url}, ${method}, ${status}, ${tokens["response-time"](
        req,
        res
    )} ms`;
};

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "https://final-project-htp7.onrender.com",
        ],
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));

app.use(
    morgan(customFormat, {
        skip: (req, res) => false,
    })
);

app.use(express.json());

app.use(cookieParser());

app.listen(process.env.PORT || 3001, () => {
    console.log(`Run on ${process.env.PORT || 3001}`);
});

app.use("/api/users", users_routes);
app.use("/api/games", games_routes);
app.use("/api/friends", friends_routes);

// console.log(__dirname);
// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "../frontend/dist")));
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});
