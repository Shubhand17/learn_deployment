const express = require("express")
const { connection } = require("./db")
const { auth } = require("./middleware/auth.middleware")
const { noteRouter } = require("./routes/note.routes")
const { userRouter } = require("./routes/user.routes")

const app = express()
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Homepage")
})
app.use("/users", userRouter)
app.use(auth)
app.use("/notes", noteRouter)


app.listen(4500, async () => {
    try {
        await connection
        console.log("Connected to DB")
    } catch (err) {
        console.log("Can not connected to DB")
        console.log(err)
    }

    console.log("Server is running at port 4500")
})