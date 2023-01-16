const express = require("express")
const connection = require("./configs/db")
const {userRouter} = require("./routes/user.route")
const {postRouter} = require("./routes/post.route")
const {authenticate} = require("./middlewares/authenticate.middleware")

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/users", userRouter)
app.use(authenticate)
app.use("/posts",postRouter)


app.listen(9090, async(req,res)=>{
    try{
        await connection
        console.log("Connected to the Database")
    }catch(err){
        console.log("trouble connecting to the database")
        console.log(err)
    }
    console.log("Listening to port 9090")
})