const {PostModel} = require("../models/post.model")
const express = require("express")

const postRouter = express.Router()

postRouter.get("/", async(req,res)=>{
    try{
        const posts = await PostModel.find()
        res.send(posts)
    }catch(err){
        console.log(err)
        console.log({"message":"Something went wrong"})
    }
})

postRouter.post("/create", async(req,res)=>{
    const payload = req.body
    try{
        const new_post = new PostModel(payload)
        await new_post.save()
        res.send("Created the post")
    }catch(err){
        console.log(err)
        console.log({"message":"Something went wrong"})
    }
})

postRouter.patch("/update/:id", async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const note = await PostModel.findOne({"_id":id})
    const userID_in_note = note.userID
    const userID_in_making = req.body.userID
    try{
        if(userID_in_making!==userID_in_note){
            res.send({"message":"You are not authorized"})
        }else{
            await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the post")
        }
    }catch(err){
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
})

postRouter.delete("/delete/:id", async(req,res)=>{
    const id = req.params.id
    try{
        await PostModel.findByIdAndDelete({"_id":id})
        res.send("Deleted the post")
    }catch(err){
        console.log(err)
        res.send({"message":"Something went wrong"})
    }
})

module.exports = {postRouter}
