const express = require("express")
const {UserModel} = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

userRouter.post("/register", async(req,res)=>{
    const {name,email, gender, password} = req.body
    try{
        bcrypt.hash(password, 5, async(err, secure_password)=>{
            if(err){
                console.log(user)
            }else{
                const user = new UserModel({name,email, gender, password:secure_password})
                await user.save()
                res.send("Registered")
            }
        })
    }catch(err){
        console.log("Error in registering the user")
        console.log(err)
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await UserModel.find({email})
        const hashed_pass = user[0].password
        if(user.length>0){
            bcrypt.compare(password, hashed_pass, (err, result)=>{
                if(result){
                    const token = jwt.sign({userID:user[0]._id}, 'masai')
                    res.send({"message":"Login Successful", "token":token})
                }else{
                    res.send("Wrong Credentials")
                }
            })
        }else{
            res.send("Wrong Credentials")
        }
    }catch(err){
        res.send("Something went wrong")
        console.log(err)     
    }
})

module.exports = {userRouter}