import express from "express"
import jwt from "jsonwebtoken"
const app = express()
app.use(express.json())
// in memory database
const allUsers = [
    {
        username: "user1",
        password: "132"
    },
    //user two
    {
        username: "user2",
        password: "123"
    }, {
        username: "user3",
        password: "122"
    }
]
function checkUser(verifyUser, verifyPassword) {
    return allUsers.find(check => check.username === verifyUser && check.password === verifyPassword)
}

//post requests for login
app.post("/signin", (req, res) => {
    // user s ka dhan hal object ka dhigbba
    const { username, password } = req.body
    if (!checkUser(username, password)) {
        return res.status(401).json({
            error: "invalid username or user doesnt exist"
        })
    }
    var token = jwt.sign({ username: username }, "hiddenkey")
    return res.status(200).json({
        token

    })
})

app.get("/users", (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            error: "no token provided"
        })
    }
    //if there is a token then verify it s correct ones
    jwt.verify(token, "hiddenkey", (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: "invalid token"
            })
        }
        //if token is correct then send the response of all users except the one who is logged in
        const otherUsers = allUsers.filter(user => user.username !== decoded.username)
        return res.status(200).json({

            message: "token is valid",
            username: decoded.username,
            users: otherUsers,
        })


    })

})

app.listen(3000, () => { console.log(`server is running on http://localhost:3000`) })

