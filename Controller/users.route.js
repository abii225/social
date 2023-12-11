
const express=require("express");
const {UserModel}=require("../Model/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userRouter=express.Router();

userRouter.get("/",(req,res)=>{
    try{

    }catch(err){
        res.send({"msg":err.message,"method":"get user"})
    }
})


userRouter.post("/register",async(req,res)=>{
    try{
        let data=req.body;
        let isExist=await UserModel.findOne({email:data.email});
        if(isExist){
            res.status(200).send({"msg":"user already exists"})
        }else{
            bcrypt.hash(data.password, 5, async(err, hash)=>{
    // Store hash in your password DB.
    let newUser=new UserModel({...data,password:hash});
            await newUser.save();
            res.status(200).send({"msg":"user registration successfull"})
});
        }
    }catch(err){
        res.send({"msg":err.message,"method":"get user"})
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
        let {email,password}=req.body;
        let user=await UserModel.findOne({email});
        if(user){
           bcrypt.compare(password, user.password, async(err, result)=>{
    // result == true
      if(result){
jwt.sign({ userId:user._id }, "NEM-111-c4", function(err, token) {
  console.log(token);
    res.status(200).send({"msg":"login success","token":token})
});
      }
});
        }else{
            res.status(200).send({"msg":"user not found, Please register"})
        }
    }catch(err){
        res.send({"msg":err.message,"method":"login user"})
    }
})

module.exports={userRouter};