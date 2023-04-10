import express from "express";
import cors from "cors";
import usuarios from "./usuarios.js";
import tweets from "./tweets.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    if (!username || username === "" || typeof username != "string") {
        res.sendStatus(400);
        return;
    }
    if (!avatar || avatar === "" || typeof avatar != "string") {
        res.sendStatus(400);
        return;
    }
    usuarios.push({ username, avatar });
    res.status(201).send("OK")
    console.log(usuarios)
})

app.post("/tweets", (req, res) => {
    console.log(tweets)
    const { username, tweet } = req.body;
    const userCadastrado = usuarios.find(usuario => usuario.username === username);
    if (!userCadastrado) {
        res.status(401).send("UNAUTHORIZED");
        return;
    }
    if (!tweet || tweet === "" || typeof tweet != "string") {
        res.sendStatus(400);
        return;
    }
    tweets.push({ username, tweet });
    res.status(201).send("OK")
    console.log(tweets)
})

app.get("/tweets", (req, res) => {
    const ultimosTweets = [];
    for (let i = (tweets.length - 1); i >= (tweets.length - 10); i--) {
        if (tweets[i] !== undefined) {
            const tweetTemp = tweets[i];
            const userTweet = usuarios.find(user => user.username === tweetTemp.username)
            tweetTemp.avatar = userTweet.avatar;
            console.log(tweetTemp)
            ultimosTweets.push(tweetTemp);
        }
    }
    res.send(ultimosTweets)
})

app.listen(5000);