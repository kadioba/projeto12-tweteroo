import express from "express";
import cors from "cors";
import usuarios from "./usuarios.js";
import tweets from "./tweets.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
    console.log(usuarios)
    const { username, avatar } = req.body;
    usuarios.push({ username, avatar });
    res.send("OK")
    console.log(usuarios)

})

app.listen(5000);