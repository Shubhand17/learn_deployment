const express = require("express")
const { NoteModel } = require("../model/note.module")
const noteRouter = express.Router()

noteRouter.get("/",async (req, res) => {
try{
    const notes = await NoteModel.find()
    res.status(200).send(notes)
} catch(err){
  res.status(400).send({"msg":err.message})
}
})

noteRouter.post("/add", async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({ "msg": "A new Note has been added" })
    } catch (err) {
        res.status(400).send({ "msg": "err message" }) 
     }

})

noteRouter.patch("/update/:noteID", (req, res) => {
    //logic
})

noteRouter.delete("/delete/:noteID", (req, res) => {
    //logic
})

module.exports = {
    noteRouter
}