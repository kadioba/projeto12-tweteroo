import express from "express";
import cors from "cors";
import usuarios from "./usuarios.js";
import tweets from "./tweets.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    usuarios.push({ username, avatar });
    res.send("OK")
    console.log(usuarios)
})

app.post("/tweets", (req, res) => {
    console.log(tweets)
    const { username, tweet } = req.body;
    const userCadastrado = usuarios.find(usuario => usuario.username === username);
    if (!userCadastrado) {
        res.send("UNAUTHORIZED");
        return;
    }
    tweets.push({ username, tweet });
    res.send("OK")
    console.log(tweets)
})

app.listen(5000);