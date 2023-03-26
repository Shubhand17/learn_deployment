const express = require("express")
const { UserModel } = require("../model/user.model")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


//Registration
userRouter.post("/register", async (req, res) => {
    const { email, pass, location, age } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            const user = new UserModel({ email, pass: hash, location, age })
            await user.save()
            res.status(200).send({ "msg": "Registration has been done!" })
        });

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }


})

//Login (authentication)

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body

    try {
        const user = await UserModel.findOne({email})
        console.log(user)
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    res.status(200).send({ "msg": "Login Successfull", "token": jwt.sign({ "course": "backend" }, "masai") })
                } else {
                    res.status(400).send({ "msg": "Invalid Credentials" })
                }
            });
        }

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }

})

// userRouter.get("/details", (req, res) => {
//     const token = req.headers.authorization
//     jwt.verify(token, 'bruce', (err, decoded) => {
//         decoded ? res.status(200).send("User Details") : res.status(400).send({ "msg": "Login required , cannot access the restricted route" })
//     });
// })

// userRouter.get("/moviedata", (req, res) => {
//     const token = req.headers.authorization
//     jwt.verify(token, 'bruce', (err, decoded) => {
//         decoded ? res.status(200).send("Movie") : res.status(400).send({ "msg": "Login required , cannot access the restricted route" })
//     });
// })

module.exports = {
    userRouter
}