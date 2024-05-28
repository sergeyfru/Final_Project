import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import users_routes from './routes/users.routes.js'
dotenv.config()

const app = express();

app.use(cors(
    {
        origin:[ 'http://localhost:5173'/** "localhost", "render" */],
        credentials:true
    }
))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

// app.use(cookieParser())

app.listen(process.env.PORT || 3001, () => {
    console.log(`Run on ${process.env.PORT || 3001}`);
})

app.use("/api/users",users_routes);

















// // Have Node serve the files for our built React app
// // app.use(express.static(path.resolve(__dirname, "./client/build")));
// app.use(express.static(path.join(__dirname, "/client/build")));

// // All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });
