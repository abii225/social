
const express=require("express");
const {connection}=require("./DB/db");
const {userRouter}=require("./Controller/users.route");
const {postRouter}=require("./Controller/post.route");
const {auth}=require("./Middleware/auth");
const cors=require("cors");
const app=express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("homepage");
})

// 
app.use("/users",userRouter);
app.use("/posts",auth,postRouter);

// 
app.listen(process.env.port,async()=>{
     try{
            await connection
            console.log("DB connected");
            console.log(`Server is running...http://localhost:${process.env.port}`)
     }catch(err){
        console.log(err);
     }
})