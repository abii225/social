
const express=require("express");
const {PostModel}=require("../Model/post.model");
const postRouter=express.Router();

postRouter.get("/",async(req,res)=>{
    try{
        let data=await PostModel.find();
        res.status(200).send(data);
    }catch(err){
       res.send({"msg":err.message,"method":"get post"});
    }
})


postRouter.post("/create",async(req,res)=>{
    try{
        let postdata=req.body;
        console.log(postdata);
        let newData=new PostModel({...postdata});
        await newData.save();
        res.status(200).send({"msg":"post added success","data":newData});
    }catch(err){
       res.send({"msg":err.message,"method":"get post"});
    }
})


postRouter.patch("/update/:id",async(req,res)=>{
    try{
        let {id}=req.params;
        let update=req.body;
        await PostModel.findByIdAndUpdate({_id:id},update);
        res.status(200).send({"msg":"Post updated"});
    }catch(err){
       res.send({"msg":err.message,"method":"get post"});
    }
})


postRouter.delete("/delete/:id",async(req,res)=>{
    try{
        let {id}=req.params;

        await PostModel.findByIdAndDelete({_id:id});
        res.status(200).send({"msg":"Post deleted"});
    }catch(err){
       res.send({"msg":err.message,"method":"get post"});
    }
})

module.exports={postRouter};