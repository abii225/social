
const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    title:String,
body:String,
device:String,
userId:String
},{
    versionKey:false
});

const PostModel=mongoose.model("social-posts",postSchema);

module.exports={
    PostModel
}